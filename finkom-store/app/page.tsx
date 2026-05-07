"use client";

import React, { ReactNode, useMemo, useState } from "react";
import { motion } from "framer-motion";

type IconProps = {
  children?: ReactNode;
  size?: number;
  className?: string;
  fill?: string;
};

const Icon = ({ children, size = 20, className = "" }: IconProps) => (
  <span
    className={`inline-flex items-center justify-center leading-none ${className}`}
    style={{ width: size, height: size, fontSize: size }}
    aria-hidden="true"
  >
    {children}
  </span>
);

const Search = (props: IconProps) => <Icon {...props}>⌕</Icon>;
const Menu = (props: IconProps) => <Icon {...props}>☰</Icon>;
const ShoppingCart = (props: IconProps) => <Icon {...props}>🛒</Icon>;
const MapPin = (props: IconProps) => <Icon {...props}>📍</Icon>;
const Phone = (props: IconProps) => <Icon {...props}>☎</Icon>;
const Truck = (props: IconProps) => <Icon {...props}>🚚</Icon>;
const ShieldCheck = (props: IconProps) => <Icon {...props}>✓</Icon>;
const Hammer = (props: IconProps) => <Icon {...props}>🔨</Icon>;
const Paintbrush = (props: IconProps) => <Icon {...props}>🖌️</Icon>;
const Bath = (props: IconProps) => <Icon {...props}>🚿</Icon>;
const Cable = (props: IconProps) => <Icon {...props}>🔌</Icon>;
const DoorOpen = (props: IconProps) => <Icon {...props}>🚪</Icon>;
const Star = (props: IconProps) => <Icon {...props}>★</Icon>;
const ArrowRight = (props: IconProps) => <Icon {...props}>→</Icon>;
const Clock = (props: IconProps) => <Icon {...props}>⏱</Icon>;

const categories = [
  { title: "Сухі суміші", icon: Hammer, items: "цемент, клей, шпаклівка" },
  { title: "Фарби та декор", icon: Paintbrush, items: "фарби, лаки, ґрунтовки" },
  { title: "Сантехніка", icon: Bath, items: "змішувачі, труби, ванни" },
  { title: "Електрика", icon: Cable, items: "кабелі, автомати, розетки" },
  { title: "Двері та вікна", icon: DoorOpen, items: "двері, фурнітура, підвіконня" },
  { title: "Інструменти", icon: Hammer, items: "ручний та електроінструмент" },
];

const products = [
  { name: "Клей для плитки універсальний", price: "від 189 грн", badge: "Хіт" },
  { name: "Фарба інтер’єрна матова", price: "від 620 грн", badge: "Акція" },
  { name: "Гіпсокартон вологостійкий", price: "від 312 грн", badge: "В наявності" },
];

export default function FinkomLanding() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    return categories.filter((c) => `${c.title} ${c.items}`.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-700 text-xl font-black text-white shadow-lg shadow-blue-700/20">Ф</div>
            <div>
              <div className="text-xl font-black uppercase tracking-tight text-blue-800">Фінком</div>
              <div className="text-xs font-medium text-slate-500">магазин будівельних матеріалів</div>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-700 lg:flex">
            <a href="#catalog" className="hover:text-blue-700">Каталог</a>
            <a href="#delivery" className="hover:text-blue-700">Доставка</a>
            <a href="#offers" className="hover:text-blue-700">Акції</a>
            <a href="#contacts" className="hover:text-blue-700">Контакти</a>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a href="tel:+380000000000" className="flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-800 hover:border-blue-300">
              <Phone size={17} /> +38 (000) 000-00-00
            </a>
            <button className="flex items-center gap-2 rounded-2xl bg-blue-700 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-blue-700/25 hover:bg-blue-800">
              <ShoppingCart size={17} /> Кошик
            </button>
          </div>

          <button className="rounded-xl border border-slate-200 p-2 lg:hidden"><Menu /></button>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden bg-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(29,78,216,0.14),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(245,158,11,0.16),transparent_26%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex flex-col justify-center">
              <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-800">
                <ShieldCheck size={17} /> Все для ремонту, будівництва і дому
              </div>
              <h1 className="max-w-3xl text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
                Будматеріали поруч — швидко, зрозуміло, без зайвого клопоту.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Каталог товарів, консультація спеціаліста, самовивіз із магазину та доставка на об’єкт. Дизайн зроблений у стилі реального будівельного магазину: синя вивіска, світлий фасад, практичність і довіра.
              </p>

              <div className="mt-8 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
  <div className="rounded-2xl border border-slate-200 bg-white p-4">
    <div className="text-2xl font-black text-blue-800">5 000+</div>
    <div className="text-sm text-slate-500">позицій у каталозі</div>
  </div>

  <div className="rounded-2xl border border-slate-200 bg-white p-4">
    <div className="text-2xl font-black text-blue-800">1 день</div>
    <div className="text-sm text-slate-500">швидка доставка</div>
  </div>

  <div className="rounded-2xl border border-slate-200 bg-white p-4">
    <div className="text-2xl font-black text-blue-800">15 хв</div>
    <div className="text-sm text-slate-500">консультація</div>
  </div>
</div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }} className="relative">
              <div className="rounded-[2rem] bg-slate-900 p-3 shadow-2xl shadow-blue-900/20">
                <div className="rounded-[1.5rem] bg-gradient-to-br from-slate-100 to-white p-5">
                  <div className="overflow-hidden rounded-[1.25rem] border border-slate-200 bg-white">
                    <div className="h-56 bg-[linear-gradient(135deg,#e2e8f0_0%,#f8fafc_40%,#dbeafe_100%)] p-6">
                      <div className="flex h-full flex-col justify-between rounded-3xl border border-white/80 bg-white/45 p-5 backdrop-blur-sm">
                        <div className="flex justify-end"><div className="rounded-full bg-blue-700 px-5 py-2 text-2xl font-black text-white shadow-lg">Фінком</div></div>
                        <div className="grid grid-cols-3 gap-3">
                          <div className="h-16 rounded-xl bg-slate-300" />
                          <div className="h-16 rounded-xl bg-slate-200" />
                          <div className="h-16 rounded-xl bg-slate-300" />
                        </div>
                      </div>
                    </div>
                    <div className="grid gap-3 p-5 sm:grid-cols-3">
                      {products.map((p) => (
                        <div key={p.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                          <div className="mb-3 inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-black text-amber-700">{p.badge}</div>
                          <div className="min-h-12 text-sm font-bold text-slate-800">{p.name}</div>
                          <div className="mt-3 text-lg font-black text-blue-800">{p.price}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-4 rounded-3xl bg-white p-5 shadow-xl shadow-slate-200">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-green-100 p-3 text-green-700"><Truck /></div>
                  <div><div className="font-black">Доставка на об’єкт</div><div className="text-sm text-slate-500">місто та район</div></div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="catalog" className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="text-3xl font-black tracking-tight md:text-4xl">Каталог товарів</h2>
              <p className="mt-3 max-w-2xl text-slate-600">Зрозумілі категорії для швидкого вибору. Основний акцент — на практичності, наявності та консультації.</p>
            </div>
            <button className="flex w-fit items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 font-bold text-white hover:bg-slate-800">Весь каталог <ArrowRight size={18} /></button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((category) => {
              const Icon = category.icon;
              return (
                <motion.div whileHover={{ y: -4 }} key={category.title} className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-xl hover:shadow-slate-200">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 group-hover:bg-blue-700 group-hover:text-white">
                    <Icon size={27} />
                  </div>
                  <h3 className="text-xl font-black">{category.title}</h3>
                  <p className="mt-2 text-sm text-slate-500">{category.items}</p>
                  <div className="mt-6 flex items-center gap-2 text-sm font-black text-blue-700">Перейти <ArrowRight size={16} /></div>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section id="delivery" className="bg-slate-900 py-16 text-white">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 lg:grid-cols-3 lg:px-8">
            <div className="rounded-3xl bg-white/10 p-6 backdrop-blur">
              <Truck className="mb-4 text-amber-300" />
              <h3 className="text-xl font-black">Доставка</h3>
              <p className="mt-2 text-slate-300">Привеземо матеріали на об’єкт або підготуємо замовлення для самовивозу.</p>
            </div>
            <div className="rounded-3xl bg-white/10 p-6 backdrop-blur">
              <MapPin className="mb-4 text-amber-300" />
              <h3 className="text-xl font-black">Магазин поруч</h3>
              <p className="mt-2 text-slate-300">Вкажіть адресу, графік роботи та карту — клієнт швидко знайде вас.</p>
            </div>
            <div className="rounded-3xl bg-white/10 p-6 backdrop-blur">
              <Clock className="mb-4 text-amber-300" />
              <h3 className="text-xl font-black">Швидке замовлення</h3>
              <p className="mt-2 text-slate-300">Форма заявки: ім’я, телефон, список матеріалів або фото з об’єкта.</p>
            </div>
          </div>
        </section>

        <section id="offers" className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
          <div className="rounded-[2rem] bg-blue-700 p-8 text-white md:p-12">
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <div className="mb-3 flex items-center gap-2 text-amber-200"><Star fill="currentColor" size={18} /> Спеціальна пропозиція</div>
                <h2 className="text-3xl font-black md:text-5xl">Знижки для майстрів та будівельних бригад</h2>
                <p className="mt-4 max-w-2xl text-blue-100">Додайте блок з умовами партнерства, оптовими цінами і швидким зв’язком з менеджером.</p>
              </div>
              <button className="rounded-2xl bg-amber-400 px-7 py-4 font-black text-slate-950 hover:bg-amber-300">Отримати консультацію</button>
            </div>
          </div>
        </section>
      </main>

      <footer id="contacts" className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 md:grid-cols-3 lg:px-8">
          <div>
            <div className="text-2xl font-black text-blue-800">Фінком</div>
            <p className="mt-2 text-sm text-slate-500">Будівельні матеріали, товари для ремонту та дому.</p>
          </div>
          <div className="text-sm text-slate-600">
            <div className="font-black text-slate-900">Контакти</div>
            <div className="mt-2">+38 (000) 000-00-00</div>
            <div>info@finkom.ua</div>
          </div>
          <div className="text-sm text-slate-600">
            <div className="font-black text-slate-900">Адреса</div>
            <div className="mt-2">Ваше місто, ваша вулиця</div>
            <div>Пн–Сб: 09:00–18:00</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

