"use client";

import { useEffect, useMemo, useState } from "react";

const products = [
  { id: "tile-adhesive", name: "Клей для плитки універсальний", price: 189, badge: "Хіт" },
  { id: "paint-matte", name: "Фарба інтер’єрна матова", price: 620, badge: "Акція" },
  { id: "drywall", name: "Гіпсокартон вологостійкий", price: 312, badge: "В наявності" },
];

const categories = ["Сухі суміші", "Фарби", "Сантехніка", "Електрика", "Двері", "Інструменти"];
const CART_KEY = "finkom-cart";

type Product = (typeof products)[number];
type CartItem = Pick<Product, "id" | "name" | "price"> & { quantity: number };

export default function FinkomLanding() {
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(CART_KEY);
    if (saved) setCart(JSON.parse(saved));
  }, []);

  const filteredCategories = useMemo(
    () => categories.filter((item) => item.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const saveCart = (next: CartItem[]) => {
    setCart(next);
    localStorage.setItem(CART_KEY, JSON.stringify(next));
  };

  const addToCart = (product: Product) => {
    const next = cart.some((item) => item.id === product.id)
      ? cart.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      : [...cart, { id: product.id, name: product.name, price: product.price, quantity: 1 }];
    saveCart(next);
    setOpen(true);
  };

  const changeQuantity = (id: string, quantity: number) => {
    saveCart(cart.map((item) => item.id === id ? { ...item, quantity } : item).filter((item) => item.quantity > 0));
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <header className="sticky top-0 z-40 border-b bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-700 text-xl font-black text-white">Ф</div>
            <div>
              <div className="text-xl font-black uppercase text-blue-800">Фінком</div>
              <div className="text-xs text-slate-500">магазин будівельних матеріалів</div>
            </div>
          </div>
          <nav className="hidden gap-8 text-sm font-bold text-slate-700 md:flex">
            <a href="#catalog">Каталог</a><a href="#delivery">Доставка</a><a href="#offers">Акції</a><a href="#contacts">Контакти</a>
          </nav>
          <button onClick={() => setOpen(true)} className="rounded-2xl bg-blue-700 px-5 py-3 font-black text-white shadow-lg">Кошик{count ? ` (${count})` : ""}</button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 p-4" onClick={() => setOpen(false)}>
          <aside className="ml-auto flex h-full max-w-md flex-col rounded-3xl bg-white p-5 shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between border-b pb-4">
              <div><div className="text-2xl font-black">Кошик</div><div className="text-sm text-slate-500">{count} товарів</div></div>
              <button onClick={() => setOpen(false)} className="rounded-xl border px-3 py-2 font-bold">Закрити</button>
            </div>
            {cart.length === 0 ? <div className="flex flex-1 items-center justify-center text-slate-500">Кошик порожній</div> : (
              <>
                <div className="flex-1 space-y-3 overflow-auto py-4">
                  {cart.map((item) => (
                    <div key={item.id} className="rounded-2xl border bg-slate-50 p-4">
                      <div className="font-black">{item.name}</div>
                      <div className="text-sm font-bold text-blue-800">{item.price} грн / шт.</div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="rounded-xl border bg-white">
                          <button onClick={() => changeQuantity(item.id, item.quantity - 1)} className="px-3 py-2 font-black">-</button>
                          <span className="inline-block min-w-8 text-center font-black">{item.quantity}</span>
                          <button onClick={() => changeQuantity(item.id, item.quantity + 1)} className="px-3 py-2 font-black">+</button>
                        </div>
                        <div className="font-black">{item.price * item.quantity} грн</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-xl font-black"><span>Разом</span><span>{total} грн</span></div>
                  <button className="mt-4 w-full rounded-2xl bg-amber-400 px-5 py-3 font-black">Оформити замовлення</button>
                  <button onClick={() => saveCart([])} className="mt-2 w-full rounded-2xl border px-5 py-3 font-black">Очистити кошик</button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 lg:grid-cols-2 lg:px-8">
          <div>
            <div className="mb-5 inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-black text-blue-800">Все для ремонту, будівництва і дому</div>
            <h1 className="text-5xl font-black tracking-tight md:text-6xl">Будматеріали поруч — швидко, зрозуміло, без зайвого клопоту.</h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">Каталог товарів, консультація спеціаліста, самовивіз із магазину та доставка на об’єкт.</p>
            <div className="mt-8 flex max-w-2xl gap-3 rounded-3xl bg-white p-3 shadow-2xl shadow-slate-200">
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Знайти: фарба, клей, сантехніка..." className="flex-1 rounded-2xl bg-slate-100 px-4 py-3 outline-none" />
              <a href="#catalog" className="rounded-2xl bg-amber-400 px-6 py-3 font-black">Підібрати товар</a>
            </div>
            <div className="mt-8 grid max-w-2xl grid-cols-3 gap-3">
              <div className="rounded-2xl border bg-white p-4"><b className="text-2xl text-blue-800">5 000+</b><div className="text-sm text-slate-500">позицій</div></div>
              <div className="rounded-2xl border bg-white p-4"><b className="text-2xl text-blue-800">1 день</b><div className="text-sm text-slate-500">доставка</div></div>
              <div className="rounded-2xl border bg-white p-4"><b className="text-2xl text-blue-800">15 хв</b><div className="text-sm text-slate-500">консультація</div></div>
            </div>
          </div>
          <div className="rounded-[2rem] bg-slate-900 p-4 shadow-2xl">
            <div className="rounded-[1.5rem] bg-white p-6">
              <div className="mb-5 rounded-3xl bg-blue-50 p-8 text-right"><span className="rounded-full bg-blue-700 px-6 py-3 text-2xl font-black text-white">Фінком</span></div>
              <div className="grid gap-3 sm:grid-cols-3">
                {products.map((product) => (
                  <div key={product.id} className="rounded-2xl border bg-slate-50 p-4">
                    <div className="mb-3 inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-black text-amber-700">{product.badge}</div>
                    <div className="min-h-12 text-sm font-bold">{product.name}</div>
                    <div className="mt-3 text-lg font-black text-blue-800">від {product.price} грн</div>
                    <button onClick={() => addToCart(product)} className="mt-4 w-full rounded-xl bg-blue-700 px-4 py-2 text-sm font-black text-white">В кошик</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <h2 className="text-4xl font-black">Каталог товарів</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCategories.map((category) => <div key={category} className="rounded-3xl border bg-white p-6 text-xl font-black shadow-sm">{category}</div>)}
        </div>
      </section>

      <section id="delivery" className="bg-slate-900 py-16 text-white"><div className="mx-auto max-w-7xl px-4 lg:px-8"><h2 className="text-3xl font-black">Доставка на об’єкт і самовивіз</h2><p className="mt-3 text-slate-300">Привеземо матеріали або підготуємо замовлення у магазині.</p></div></section>
      <section id="offers" className="mx-auto max-w-7xl px-4 py-16 lg:px-8"><div className="rounded-[2rem] bg-blue-700 p-10 text-white"><h2 className="text-4xl font-black">Знижки для майстрів та бригад</h2></div></section>
      <footer id="contacts" className="border-t bg-white py-10"><div className="mx-auto max-w-7xl px-4 text-sm text-slate-600 lg:px-8"><b className="text-blue-800">Фінком</b><div>+38 (000) 000-00-00</div><div>info@finkom.ua</div></div></footer>
    </main>
  );
}
