const BookCard = ({ title, author, price, condition }: any) => (
  <div className="group relative bg-white border border-forest/10 p-4 transition-all hover:shadow-2xl hover:-translate-y-1">
    <div className="aspect-[2/3] w-full bg-stone-200 mb-4 overflow-hidden relative">
      <div className="absolute inset-0 bg-forest/5 group-hover:bg-transparent transition-colors" />
      <div className="flex items-center justify-center h-full text-forest/20 font-serif italic text-sm text-center px-4">
        {title} <br/> Cover Art
      </div>
      <span className="absolute bottom-2 right-2 bg-sienna text-parchment text-[10px] px-2 py-1 uppercase tracking-widest font-bold">
        {condition}
      </span>
    </div>
    <h3 className="text-forest font-serif text-lg font-bold leading-tight">{title}</h3>
    <p className="text-charcoal/60 text-sm italic mb-3">{author}</p>
    <div className="flex justify-between items-center border-t border-forest/10 pt-3">
      <span className="text-forest font-bold font-sans">${price}</span>
      <button className="text-sienna text-xs font-bold uppercase tracking-tighter hover:text-forest">
        View Details →
      </button>
    </div>
  </div>
);