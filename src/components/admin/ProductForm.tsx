'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Variant {
  size: string;
  color: string;
  stock: number;
  sku?: string;
}

interface ProductFormProps {
  product?: any; // You can define a proper type
}

export default function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const [variants, setVariants] = useState<Variant[]>(product?.variants || [{ size: '', color: '', stock: 0, sku: '' }]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  function slugify(value: string) { return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    let image = String(formData.get('image') || '');
    const imageFile = formData.get('imageFile');
    if (imageFile instanceof File && imageFile.size > 0) {
      setUploading(true);
      const upload = new FormData(); upload.append('file', imageFile);
      const uploadResponse = await fetch('/api/admin/upload', { method: 'POST', body: upload });
      const uploadData = await uploadResponse.json();
      setUploading(false);
      if (!uploadResponse.ok) { alert(uploadData.error || 'Image upload failed'); setLoading(false); return; }
      image = uploadData.url;
    }
    const data = {
      name: formData.get('name'),
      slug: formData.get('slug'),
      price: parseInt(formData.get('price') as string),
      oldPrice: formData.get('oldPrice') ? parseInt(formData.get('oldPrice') as string) : undefined,
      category: formData.get('category'),
      sub: formData.get('sub') || undefined,
      description: formData.get('description'),
      image,
      image2: formData.get('image2') || undefined,
      badge: formData.get('badge') || undefined,
      variants: variants,
    };

    const url = product ? `/api/admin/products/${product.id}` : '/api/admin/products';
    const method = product ? 'PUT' : 'POST';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      router.push('/admin/products');
    } else {
      alert('Failed to save product');
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input name="name" defaultValue={product?.name} required onChange={(e) => { if (!product) { const slug = e.currentTarget.form?.elements.namedItem('slug') as HTMLInputElement | null; if (slug) slug.value = slugify(e.currentTarget.value); } }} className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Slug <span className="font-normal text-gray-500">(URL name)</span></label>
          <input name="slug" defaultValue={product?.slug} required placeholder="product-name" className="w-full border rounded px-3 py-2" />
          <p className="mt-1 text-xs text-gray-500">Used in the product URL, e.g. /products/linen-shirt.</p>
        </div>
        <div>
          <label className="block text-sm font-medium">Price (PKR)</label>
          <input name="price" type="number" defaultValue={product?.price} required className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Old Price (PKR)</label>
          <input name="oldPrice" type="number" defaultValue={product?.old_price} className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Category</label>
          <select name="category" defaultValue={product?.category || 'Men'} required className="w-full border rounded px-3 py-2"><option>Men</option><option>Women</option><option>Accessories</option></select>
        </div>
        <div>
          <label className="block text-sm font-medium">Sub-category</label>
          <input name="sub" defaultValue={product?.sub} className="w-full border rounded px-3 py-2" />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium">Description</label>
          <textarea name="description" defaultValue={product?.description} rows={3} required className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Product image</label>
          <input name="imageFile" type="file" accept="image/*" required={!product} className="w-full border rounded px-3 py-2" />
          <input name="image" type="hidden" defaultValue={product?.image} />
          <p className="mt-1 text-xs text-gray-500">JPG, PNG, or WebP up to 5MB.</p>
        </div>
        <div>
          <label className="block text-sm font-medium">Second image <span className="font-normal text-gray-500">(optional URL)</span></label>
          <input name="image2" defaultValue={product?.image2} className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Badge</label>
          <input name="badge" defaultValue={product?.badge} className="w-full border rounded px-3 py-2" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Variants (Size, Color, Stock)</h3>
        {variants.map((v, idx) => (
          <div key={idx} className="grid grid-cols-4 gap-2 mb-2">
            <input
              placeholder="Size"
              value={v.size}
              onChange={(e) => {
                const newVariants = [...variants];
                newVariants[idx].size = e.target.value;
                setVariants(newVariants);
              }}
              className="border rounded px-2 py-1"
            />
            <input
              placeholder="Color"
              value={v.color}
              onChange={(e) => {
                const newVariants = [...variants];
                newVariants[idx].color = e.target.value;
                setVariants(newVariants);
              }}
              className="border rounded px-2 py-1"
            />
            <input
              placeholder="Stock"
              type="number"
              value={v.stock}
              onChange={(e) => {
                const newVariants = [...variants];
                newVariants[idx].stock = parseInt(e.target.value) || 0;
                setVariants(newVariants);
              }}
              className="border rounded px-2 py-1"
            />
            <input
              placeholder="SKU (optional)"
              value={v.sku || ''}
              onChange={(e) => {
                const newVariants = [...variants];
                newVariants[idx].sku = e.target.value;
                setVariants(newVariants);
              }}
              className="border rounded px-2 py-1"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => setVariants([...variants, { size: '', color: '', stock: 0, sku: '' }])}
          className="text-blue-600 text-sm"
        >
          + Add Variant
        </button>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-50"
        >
          {uploading ? 'Uploading image...' : loading ? 'Saving...' : product ? 'Update product' : 'Create product'}
        </button>
      </div>
    </form>
  );
}
