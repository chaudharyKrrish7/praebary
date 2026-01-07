"use client";
import React, { useState, useEffect, useRef } from 'react';
import {
  Search, X, ShoppingBag, Instagram, Trash2, Check,
  Bookmark, ArrowDown, Zap, Telescope, Info, TrendingUp,
  Camera, Feather, Compass, Layers, History, UserCheck, Award, HelpCircle,
  ArrowUpRight, Mail, Star, Quote, Heart, BookOpen
} from 'lucide-react';

// --- DATA ARCHIVE: ALL 16 ASSETS -
const BOOKS_DATA = [
  { id: '1', title: "The Alchemist", author: "Paulo Coelho", price: 199, category: "Classics", assetRating: "Stable", condition: "Pristine", image: "https://m.media-amazon.com/images/I/71aFt4+OTOL._AC_UF1000,1000_QL80_.jpg", curatorNote: "A fable about following your dream.", provenance: "Acquired from a private collection in DLF Phase 5.", rating: 5, reviews: [{ user: "Alex", rating: 5, comment: "Timeless wisdom." }] },
  { id: '2', title: "Atomic Habits", author: "James Clear", price: 299, category: "Growth", assetRating: "High", condition: "Like New", image: "https://m.media-amazon.com/images/I/91bYsX41DVL._AC_UF1000,1000_QL80_.jpg", curatorNote: "The definitive guide to habit formation.", provenance: "Direct archive acquisition.", rating: 4, reviews: [{ user: "Jordan", rating: 4, comment: "Practical and insightful." }] },
  { id: '3', title: "The Power of Now", author: "Eckhart Tolle", price: 219, category: "Growth", assetRating: "Stable", condition: "Excellent", image: "https://m.media-amazon.com/images/I/61mIq2iJUXL._AC_UF1000,1000_QL80_.jpg", curatorNote: "A guide to spiritual enlightenment.", provenance: "Sourced from a legacy library in South Delhi.", rating: 5, reviews: [{ user: "Mia", rating: 5, comment: "Life-changing." }] },
  { id: '4', title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", price: 219, category: "Business", assetRating: "Classic", condition: "Very Good", image: "https://m.media-amazon.com/images/I/81bnd0fkLzL._AC_UF1000,1000_QL80_.jpg", curatorNote: "The foundational text on financial literacy.", provenance: "Verified first-owner asset.", rating: 4, reviews: [{ user: "Chris", rating: 4, comment: "Eye-opening on finances." }] },
  { id: '5', title: "The Secret", author: "Rhonda Byrne", price: 289, category: "Growth", assetRating: "Stable", condition: "Excellent", image: "https://m.media-amazon.com/images/I/81S77fR0PPL._AC_UF1000,1000_QL80_.jpg", curatorNote: "The law of attraction in its most popular form.", provenance: "Pristine dust jacket preserved.", rating: 5, reviews: [{ user: "Sophia", rating: 5, comment: "Inspirational." }] },
  { id: '6', title: "Ikigai", author: "Héctor García", price: 199, category: "Growth", assetRating: "Stable", condition: "Pristine", image: "https://m.media-amazon.com/images/I/81l3rZK4lnL._AC_UF1000,1000_QL80_.jpg", curatorNote: "The Japanese secret to a long and happy life.", provenance: "Acquired from mindfulness collection.", rating: 5, reviews: [{ user: "Ethan", rating: 5, comment: "Beautiful philosophy." }] },
  { id: '7', title: "Harry Potter & Philosopher's Stone", author: "J.K. Rowling", price: 240, category: "Series", assetRating: "High", condition: "Like New", image: "https://m.media-amazon.com/images/I/81YOuOG6nBL._AC_UF1000,1000_QL80_.jpg", curatorNote: "The beginning of the magical journey.", provenance: "Verified structural integrity.", rating: 5, reviews: [{ user: "Olivia", rating: 5, comment: "Magical start." }] },
  { id: '8', title: "Hitchhiker's Guide Set", author: "Douglas Adams", price: 929, category: "Series", assetRating: "Collector", condition: "Mint", image: "https://m.media-amazon.com/images/I/81XSN3hA5pL._AC_UF1000,1000_QL80_.jpg", curatorNote: "The complete five-book trilogy.", provenance: "Full box set acquired from a legacy estate.", rating: 5, reviews: [{ user: "Noah", rating: 5, comment: "Hilarious sci-fi." }] },
  { id: '9', title: "Hard Thing About Hard Things", author: "Ben Horowitz", price: 250, category: "Business", assetRating: "High", condition: "Excellent", image: "https://m.media-amazon.com/images/I/810u9MFEKML._AC_UF1000,1000_QL80_.jpg", curatorNote: "Building a business when things fall apart.", provenance: "Essential leadership acquisition.", rating: 4, reviews: [{ user: "Ava", rating: 4, comment: "Real-world advice." }] },
  { id: '10', title: "White Nights", author: "Fyodor Dostoevsky", price: 179, category: "Classics", assetRating: "Legendary", condition: "Pristine", image: "https://m.media-amazon.com/images/I/81N768-DHEL._AC_UF1000,1000_QL80_.jpg", curatorNote: "A sentimental story of unrequited love.", provenance: "Sourced from an academic holding.", rating: 5, reviews: [{ user: "Liam", rating: 5, comment: "Deeply emotional." }] },
  { id: '11', title: "The Odyssey", author: "Homer", price: 250, category: "Classics", assetRating: "Legendary", condition: "Excellent", image: "https://m.media-amazon.com/images/I/81g73KS93TL._AC_UF1000,1000_QL80_.jpg", curatorNote: "The epic journey of Odysseus.", provenance: "Classic translation; unblemished pages.", rating: 5, reviews: [{ user: "Isabella", rating: 5, comment: "Epic tale." }] },
  { id: '12', title: "The Mystery Asset", author: "Archive Secret", price: 249, category: "Mystery", assetRating: "Unknown", condition: "Pristine", image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800", curatorNote: "Three keywords: Soul, Solitude, Starlight.", provenance: "Wrapped in Heritage Parchment.", rating: 4, reviews: [{ user: "Mason", rating: 4, comment: "Intriguing mystery." }] },
  { id: '13', title: "To Kill a Mockingbird", author: "Harper Lee", price: 189, category: "Classics", assetRating: "Legendary", condition: "Pristine", image: "https://m.media-amazon.com/images/I/81gepf1eMqL._AC_UF1000,1000_QL80_.jpg", curatorNote: "A novel of warmth and humor despite serious themes.", provenance: "From a distinguished Southern collection.", rating: 5, reviews: [{ user: "Emma", rating: 5, comment: "Profound and moving." }] },
  { id: '14', title: "Sapiens: A Brief History", author: "Yuval Noah Harari", price: 349, category: "Growth", assetRating: "High", condition: "Like New", image: "https://m.media-amazon.com/images/I/91rEl8A8aVL._AC_UF1000,1000_QL80_.jpg", curatorNote: "From Big Bang to modern society.", provenance: "Acquired from historical archives.", rating: 5, reviews: [{ user: "Lucas", rating: 5, comment: "Mind-expanding." }] },
  { id: '15', title: "The Lean Startup", author: "Eric Ries", price: 279, category: "Business", assetRating: "Classic", condition: "Excellent", image: "https://m.media-amazon.com/images/I/81RC9zM6GFL._AC_UF1000,1000_QL80_.jpg", curatorNote: "Continuous innovation for entrepreneurs.", provenance: "Silicon Valley startup collection.", rating: 4, reviews: [{ user: "Grace", rating: 4, comment: "Essential startup guide." }] },
  { id: '16', title: "Dune", author: "Frank Herbert", price: 399, category: "Series", assetRating: "Collector", condition: "Mint", image: "https://m.media-amazon.com/images/I/81Q0u4vYqVL._AC_UF1000,1000_QL80_.jpg", curatorNote: "The epic sci-fi masterpiece.", provenance: "Limited edition from estate.", rating: 5, reviews: [{ user: "James", rating: 5, comment: "Epic world-building." }] },
];

const TESTIMONIALS = [
  { name: "Dr. Elena Vasquez", role: "Literature Professor", quote: "Praebary has redefined my approach to book collecting. The curation is impeccable.", rating: 5 },
  { name: "Marcus Chen", role: "Tech Entrepreneur", quote: "Finally, a platform that treats books as the valuable assets they are. Exceptional service.", rating: 5 },
  { name: "Sophia Reynolds", role: "Art Collector", quote: "The scouting service found rare editions I thought were impossible to acquire.", rating: 5 },
];

export default function Home() {
  const [cart, setCart] = useState([]);
  const [custodianName, setCustodianName] = useState('');
  const [activeCategory, setActiveCategory] = useState("All");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showPlateHelp, setShowPlateHelp] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [showNewsletterSuccess, setShowNewsletterSuccess] = useState(false);

  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);

  // useEffect(() => {
  //   const moveCursor = (e: MouseEvent) => {
  //     if (cursorRef.current && cursorDotRef.current) {
  //       cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
  //       cursorDotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
  //     }
  //   };
  //   window.addEventListener('mousemove', moveCursor);
  //   const handleScroll = () => setScrolled(window.scrollY > 50);
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener('mousemove', moveCursor);
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  const handleCheckout = (type) => {
    const handle = "praebary";
    const total = cart.reduce((s, b) => s + b.price, 0);
    const bookList = cart.map(b => `• ${b.title}`).join('\n');
    let msg = type === 'order'
      ? `VAULT ORDER\n\nCustodian: ${custodianName || 'Unspecified'}\n\nAssets:\n${bookList}\n\nTotal Acquisition: ₹${total}`
      : `Inquiry for Archive Acquisition / Scouting Mission.`;
    navigator.clipboard.writeText(msg);
    setShowToast(true);
    setTimeout(() => { setShowToast(false); window.open(`https://ig.me/m/${handle}`, '_blank'); }, 1200);
  };

  const handleNewsletterSignup = (e) => {
    e.preventDefault();
    setShowNewsletterSuccess(true);
    setNewsletterEmail('');
    setTimeout(() => setShowNewsletterSuccess(false), 3000);
  };

  const filteredBooks = BOOKS_DATA.filter(b =>
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (activeCategory === "All" || b.category === activeCategory)
  );

  const searchResults = searchQuery.length > 0 
    ? BOOKS_DATA.filter(b => b.title.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 4)
    : [];

  return (
    <main className="min-h-screen bg-[#0C1519] text-[#CF9D7B] font-sans selection:bg-[#724B39] selection:text-[#E8D8C4] cursor-none text-[14px] scroll-smooth overflow-x-hidden">
      
      {/* --- PREMIUM FONT IMPORT --- */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=Great+Vibes&family=Montserrat:wght@300;400;500&display=swap');
        
        .font-heritage { font-family: 'Cinzel Decorative', cursive; }
        .font-premium { font-family: 'Bodoni Moda', serif; }
        .font-script { font-family: 'Great Vibes', cursive; }
        .font-ledger { font-family: 'Montserrat', sans-serif; letter-spacing: 0.05em; }

        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-100%); } }
        .animate-marquee { display: inline-block; animation: marquee 60s linear infinite; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        
        .animate-in { animation: fadeIn 0.8s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* --- CURSOR --- */}
      <div ref={cursorRef} className="fixed top-0 left-0 w-12 h-12 border border-[#CF9D7B]/30 rounded-full pointer-events-none z-[999] transition-transform duration-300 ease-out hidden md:block" />
      <div ref={cursorDotRef} className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#CF9D7B] rounded-full pointer-events-none z-[999] hidden md:block" />
      
      {/* --- MARQUEE --- */}
      <div className="bg-[#561C24] text-[#E8D8C4] py-2 border-b border-white/5 sticky top-0 z-[110] overflow-hidden whitespace-nowrap font-ledger text-[10px]">
        <div className="inline-block animate-marquee uppercase">
          <Zap size={10} className="inline mr-1" /> 2026 Archive Cycle Open • Buy-Back Yield Enabled • Authentication Protocol Active • Gurgaon Archive • Premium Curations Available •
        </div>
        <div className="inline-block animate-marquee uppercase ml-10">
          <Zap size={10} className="inline mr-1" /> 2026 Archive Cycle Open • Buy-Back Yield Enabled • Authentication Protocol Active • Gurgaon Archive • Premium Curations Available •
        </div>
      </div>

      {/* --- NAV --- */}
      <nav className={`fixed top-12 w-full z-[100] transition-all duration-700 px-12 ${scrolled ? "py-4 bg-[#162127]/95 shadow-2xl translate-y-[-48px]" : "py-10 bg-transparent"}`}>
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          <a href="#" className="text-4xl font-heritage text-[#CF9D7B] tracking-widest pt-1">PRAEBARY</a>
          <div className="hidden lg:flex gap-12 font-ledger text-[10px] uppercase font-medium opacity-60">
            <a href="#vision" className="hover:text-[#E8D8C4] transition-colors tracking-[0.2em]">Vision</a>
            <a href="#scout" className="hover:text-[#E8D8C4] transition-colors tracking-[0.2em]">Scout</a>
            <a href="#acquisition" className="hover:text-[#E8D8C4] transition-colors tracking-[0.2em]">Sell</a>
            <a href="#testimonials" className="hover:text-[#E8D8C4] transition-colors tracking-[0.2em]">Voices</a>
            <a href="#catalogue" className="hover:text-[#E8D8C4] transition-colors tracking-[0.2em]">Catalogue</a>
          </div>
          <button onClick={() => setIsCartOpen(true)} className="relative group p-2">
            <ShoppingBag size={20} strokeWidth={1.2} />
            {cart.length > 0 && <span className="absolute top-0 right-0 bg-[#561C24] text-[#E8D8C4] text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-ledger font-bold border border-[#0C1519]">{cart.length}</span>}
          </button>
        </div>
      </nav>

      {/* --- HERO / SEARCH (STRICTLY CENTERED) --- */}
      <section className="h-[95vh] flex flex-col items-center justify-center relative bg-[#162127] text-[#E8D8C4] px-8 text-center border-b border-white/5 overflow-hidden">
        <div className={`transition-all duration-1000 max-w-2xl flex flex-col items-center justify-center ${searchQuery.length > 0 ? 'scale-75 -translate-y-16' : 'scale-100'}`}>
          <span className="text-[#CF9D7B] font-ledger text-[11px] uppercase tracking-[1em] font-medium block mb-6 opacity-60">Premium Archival Holding</span>
          <h1 className="text-[8rem] md:text-[14rem] font-heritage leading-none mb-4 tracking-tighter text-center">PRAEBARY</h1>
          <p className="max-w-md mx-auto font-script text-3xl text-[#CF9D7B]/80 pt-4">Curating the distinguished library since cycle 2026.</p>
        </div>

        {/* SEARCH BOX */}
        <div className="relative group max-w-xl w-full mx-auto mt-8 z-20">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#CF9D7B]/30 group-focus-within:text-[#CF9D7B] transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Query the Archive Registry..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            className="w-full bg-white/5 border border-white/10 py-5 pl-14 pr-12 rounded-full focus:outline-none focus:border-[#CF9D7B]/40 text-[#E8D8C4] font-premium text-lg italic transition-all shadow-[0_20px_50px_rgba(0,0,0,0.5)]" 
          />
          {searchQuery.length > 0 && (
            <button onClick={() => setSearchQuery('')} className="absolute right-6 top-1/2 -translate-y-1/2 text-[#CF9D7B] opacity-40 hover:opacity-100">
              <X size={18} />
            </button>
          )}
        </div>

        {/* SEARCH RESULTS DISPLAY */}
        {searchQuery.length > 0 && (
          <div className="absolute bottom-16 w-full max-w-5xl animate-in px-8">
             <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
                {searchResults.map((book) => (
                  <div key={book.id} onClick={() => setSelectedBook(book)} className="group cursor-pointer">
                    <div className="aspect-[3/4] bg-black/40 mb-4 overflow-hidden border border-white/10 relative shadow-2xl">
                       <img src={book.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                          <button className="w-full bg-[#CF9D7B] text-[#0C1519] py-2 font-ledger text-[10px] uppercase font-bold">View Asset</button>
                       </div>
                    </div>
                    <h4 className="font-heritage text-[11px] tracking-widest text-[#CF9D7B] truncate uppercase">{book.title}</h4>
                  </div>
                ))}
             </div>
          </div>
        )}
        {!searchQuery && <div className="absolute bottom-12 animate-bounce opacity-20"><ArrowDown size={32} /></div>}
      </section>

      {/* --- VISION --- */}
      <section id="vision" className="py-56 px-12 bg-[#0C1519] text-[#E8D8C4] border-b border-white/5">
        <div className="max-w-[1000px] mx-auto text-center space-y-24">
          <Feather size={28} className="mx-auto text-[#724B39] opacity-40" />
          <h2 className="text-6xl md:text-8xl font-premium italic leading-tight">Knowledge is a <br /> <span className="text-[#CF9D7B] font-heritage uppercase tracking-wider text-5xl md:text-6xl">Borrowed Commodity.</span></h2>
          <p className="text-2xl md:text-3xl font-premium italic leading-relaxed opacity-60 max-w-3xl mx-auto">
            "We believe the weight of a book lies in its journey, not its permanent residence on a shelf. Release your library. Fund your next discovery."
          </p>
        </div>
      </section>

      {/* --- SCOUT MISSION --- */}
      <section id="scout" className="py-56 px-12 bg-[#162127] border-y border-white/5 text-[#E8D8C4]">
        <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-32 items-center">
          <div className="space-y-12 text-left">
            <Compass size={40} className="text-[#CF9D7B]" strokeWidth={1} />
            <h2 className="text-6xl font-heritage tracking-widest uppercase">Archive Scouting</h2>
            <p className="text-xl font-premium italic opacity-60 leading-relaxed">If a specific volume has eluded your collection, our scouts navigate specialized networks to secure the books that matter most.</p>
            <button onClick={() => handleCheckout('scout')} className="font-ledger text-[11px] uppercase font-bold tracking-[0.5em] border border-[#CF9D7B]/40 px-12 py-6 hover:bg-[#CF9D7B] hover:text-[#162127] transition-all">Initiate Search</button>
          </div>
          <div className="p-12 bg-black/20 border-l-[12px] border-[#724B39] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#CF9D7B]/5 rounded-full blur-3xl -mr-16 -mt-16" />
              <h4 className="font-ledger text-[11px] uppercase font-bold text-[#CF9D7B] mb-8 tracking-[0.4em]">Archival Protocol Logs</h4>
              <div className="space-y-8 font-premium italic text-lg text-[#E8D8C4]/70">
                <p>• 1965 First Edition Dune <span className="text-xs font-ledger opacity-40 ml-2">(Sourced: 11 Days)</span></p>
                <p>• Signed Murakami Prints <span className="text-xs font-ledger opacity-40 ml-2">(Sourced: 8 Days)</span></p>
                <p>• Rare Tolkien Manuscripts <span className="text-xs font-ledger opacity-40 ml-2">(Sourced: 14 Days)</span></p>
              </div>
          </div>
        </div>
      </section>

      {/* --- ACQUISITION --- */}
      <section id="acquisition" className="py-56 bg-[#0C1519] text-[#E8D8C4] px-12 border-b border-white/5">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-32 items-center">
          <div className="bg-white/5 border border-white/5 p-20 space-y-12 backdrop-blur-sm shadow-[0_50px_100px_rgba(0,0,0,0.5)]">
            <Camera size={40} className="text-[#CF9D7B] mx-auto lg:mx-0" strokeWidth={1} />
            <h3 className="text-5xl font-premium italic">Vault Appraisal</h3>
            <p className="font-ledger text-sm italic opacity-50 leading-relaxed">Submit high-resolution condition imagery via DM for an instant remote valuation cycle.</p>
            <button onClick={() => handleCheckout('sell')} className="font-ledger text-[11px] uppercase font-bold tracking-[0.5em] bg-[#561C24] text-[#E8D8C4] px-12 py-6 hover:bg-[#CF9D7B] hover:text-[#162127] transition-all w-full">Submit Asset</button>
          </div>
          <div className="space-y-8">
            <h2 className="text-7xl font-heritage tracking-tighter uppercase text-[#CF9D7B] leading-tight">Release to <br/> the Vault.</h2>
            <p className="text-xl font-premium italic opacity-60 leading-relaxed max-w-md">Liquidity for your library. Fund your next discovered interest by releasing your current holding.</p>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section id="testimonials" className="py-56 px-12 bg-[#162127] border-y border-white/5">
        <div className="max-w-[1300px] mx-auto text-center space-y-36">
          <div className="space-y-4">
             <h2 className="text-7xl font-heritage tracking-widest text-[#CF9D7B] uppercase">Voices from the Vault</h2>
             <div className="w-24 h-px bg-[#724B39] mx-auto" />
          </div>
          <div className="grid md:grid-cols-3 gap-16">
            {TESTIMONIALS.map((testimonial, i) => (
              <div key={i} className="bg-white/5 p-16 border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.3)] space-y-10 text-left transition-all hover:bg-white/[0.07] group">
                <Quote size={40} className="text-[#724B39] opacity-20 group-hover:opacity-40 transition-opacity" />
                <p className="text-xl font-premium italic opacity-80 leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex justify-between items-end border-t border-white/10 pt-10">
                  <div className="space-y-1">
                    <h4 className="font-heritage text-[11px] tracking-widest text-[#CF9D7B] uppercase">{testimonial.name}</h4>
                    <p className="font-ledger text-[9px] uppercase tracking-widest opacity-40">{testimonial.role}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <Star key={j} size={14} fill="#CF9D7B" stroke="#CF9D7B" strokeWidth={1} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CATALOGUE --- */}
      <section id="catalogue" className="py-56 px-12 max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-40 gap-16 border-b border-white/5 pb-20">
          <div className="space-y-4 text-left">
            <h2 className="text-[6rem] font-heritage tracking-tighter text-[#CF9D7B] uppercase leading-none">The Holding</h2>
            <p className="font-ledger text-[11px] uppercase font-medium tracking-[0.8em] opacity-40">Gurgaon Inventory • Registry Cycle 2026</p>
          </div>
          <div className="flex gap-10 overflow-x-auto no-scrollbar pb-4 font-ledger text-[10px] uppercase font-bold tracking-widest">
            {["All", "Classics", "Growth", "Business", "Series", "Mystery"].map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={`transition-all ${activeCategory === cat ? "text-[#CF9D7B] border-b-2 border-[#CF9D7B] pb-2" : "opacity-30 hover:opacity-100"}`}>{cat}</button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-36">
          {filteredBooks.map((book) => (
            <div key={book.id} className="group relative">
              <div onClick={() => setSelectedBook(book)} className="aspect-[3/4.5] w-full mb-12 cursor-pointer relative transition-all duration-1000 group-hover:-translate-y-6 shadow-[0_40px_80px_rgba(0,0,0,0.6)] overflow-hidden bg-black">
                <div className="absolute inset-0 bg-[#0C1519]/30 z-10 pointer-events-none group-hover:opacity-0 transition-opacity duration-1000" />
                <img src={book.image} alt={book.title} className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
                {book.category === "Mystery" && <div className="absolute top-6 right-6 bg-[#561C24] text-white p-3 rounded-full z-20 shadow-2xl animate-pulse"><HelpCircle size={18}/></div>}
              </div>

              <div className="space-y-6 text-center px-4">
                <div className="space-y-2">
                  <span className="font-ledger text-[9px] uppercase tracking-[0.5em] font-bold text-[#724B39]">{book.category}</span>
                  <h3 className="text-2xl font-heritage tracking-widest text-[#E8D8C4] leading-tight uppercase min-h-[3rem] flex items-center justify-center">{book.title}</h3>
                </div>
                <div className="flex justify-center gap-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={10} fill={i < book.rating ? "#CF9D7B" : "none"} stroke="#CF9D7B" strokeWidth={1.5} />
                  ))}
                </div>
                <div className="flex flex-col items-center gap-6 pt-4 border-t border-white/5 mt-4">
                  <p className="font-premium text-3xl text-[#CF9D7B]">₹{book.price}</p>
                  <button onClick={() => {setCart([...cart, book]); setIsCartOpen(true);}} className="font-ledger text-[10px] uppercase font-bold tracking-[0.5em] opacity-40 hover:opacity-100 transition-all border-b border-[#CF9D7B]/30 hover:border-[#CF9D7B] pb-1 text-[#E8D8C4]">Acquire Portfolio Item</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- SLEEK MINIMAL FOOTER --- */}
      <footer className="py-12 bg-[#0C1519] border-t border-white/5 font-ledger">
        <div className="max-w-[1400px] mx-auto px-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] uppercase tracking-[0.8em] text-[#CF9D7B]/40">© 2026 PRAEBARY PREMIUM ARCHIVE</p>
          <div className="flex gap-12 text-[10px] uppercase tracking-[0.4em] font-medium opacity-60 text-[#E8D8C4]">
            <a href="#vision" className="hover:text-white transition-colors">Vision</a>
            <a href="#scout" className="hover:text-white transition-colors">Scout</a>
            <a href="#acquisition" className="hover:text-white transition-colors">Appraisals</a>
            <a href="https://instagram.com/praebary" target="_blank" className="hover:text-white transition-colors">Instagram</a>
          </div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#CF9D7B]/30 italic">GURGAON SECTOR CYCLE</p>
        </div>
      </footer>

      {/* --- MODAL --- */}
      {selectedBook && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-8 bg-black/98 backdrop-blur-3xl animate-in">
          <div className="bg-[#162127] border border-white/10 max-w-7xl w-full flex flex-col md:flex-row relative shadow-[0_80px_150px_rgba(0,0,0,1)] overflow-hidden cursor-auto text-[#E8D8C4]">
            <button onClick={() => setSelectedBook(null)} className="absolute top-10 right-10 text-white/30 hover:text-white z-10 transition-colors"><X size={32}/></button>
            <div className="w-full md:w-1/2 p-24 bg-black/50 flex items-center justify-center relative">
                <div className="absolute top-0 left-0 w-2 h-full bg-[#724B39]" />
                <img src={selectedBook.image} className="w-full shadow-[0_50px_100px_rgba(0,0,0,0.8)] aspect-[3/4] object-cover transition-transform duration-1000 hover:scale-[1.02]" />
            </div>
            <div className="w-full md:w-1/2 p-20 md:p-32 flex flex-col justify-center space-y-20">
              <div className="space-y-16">
                <div className="flex items-center gap-6">
                  <TrendingUp size={24} className="text-[#CF9D7B]" strokeWidth={1} />
                  <span className="font-ledger text-[11px] uppercase tracking-[0.8em] font-bold text-[#CF9D7B]">Asset Status: {selectedBook.assetRating}</span>
                </div>
                <h2 className="text-8xl font-heritage tracking-tighter uppercase leading-none border-b border-white/5 pb-12">{selectedBook.title}</h2>
                <div className="space-y-10">
                  <p className="text-2xl font-premium italic opacity-60 leading-relaxed font-light">"{selectedBook.curatorNote}"</p>
                  <div className="flex items-start gap-6 opacity-30 pt-4"><History size={20} /><p className="font-ledger text-xs uppercase tracking-[0.3em]">Provenance: {selectedBook.provenance}</p></div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-16 border-t border-white/10">
                <span className="text-6xl font-premium text-[#CF9D7B]">₹{selectedBook.price}</span>
                <button onClick={() => {setCart([...cart, selectedBook]); setIsCartOpen(true); setSelectedBook(null);}} className="bg-[#561C24] text-[#E8D8C4] px-20 py-8 font-ledger text-[12px] font-bold uppercase tracking-[0.6em] hover:bg-[#CF9D7B] hover:text-[#162127] transition-all shadow-2xl">Induct Asset</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- CART DRAWER --- */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[250] flex justify-end">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full max-w-xl bg-[#0C1519] h-full flex flex-col shadow-2xl border-l-4 border-[#724B39]">
            <div className="p-12 flex justify-between items-center font-heritage tracking-[0.5em] text-lg text-[#CF9D7B] border-b border-white/5 uppercase">
              ARCHIVE VAULT
              <button onClick={() => setIsCartOpen(false)}><X size={24}/></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-12 space-y-12 no-scrollbar">
              {cart.map((item, i) => (
                <div key={i} className="flex justify-between items-center pb-12 border-b border-white/10 text-[#E8D8C4]">
                  <div className="flex gap-10 items-center">
                    <img src={item.image} className="w-20 h-28 object-cover shadow-[0_20px_40px_rgba(0,0,0,0.5)] border border-white/10" />
                    <div>
                      <h4 className="font-heritage text-[11px] tracking-widest uppercase mb-2">{item.title}</h4>
                      <p className="font-ledger text-sm italic text-[#CF9D7B]">₹{item.price}</p>
                    </div>
                  </div>
                  <button onClick={() => setCart(cart.filter((_, idx) => idx !== i))} className="opacity-30 hover:opacity-100 hover:text-[#CF9D7B] transition-all"><Trash2 size={24}/></button>
                </div>
              ))}
              {cart.length === 0 && <p className="text-center opacity-30 italic font-premium text-2xl py-24">Registry is currently empty.</p>}
            </div>

            <div className="p-12 bg-[#162127] border-t border-white/10 space-y-12 mt-auto">
              <div className="space-y-8">
                <div className="flex justify-between items-center text-[#E8D8C4]">
                  <div className="flex items-center gap-4 text-[#CF9D7B]"><UserCheck size={20} strokeWidth={1} /><span className="font-ledger text-[10px] uppercase font-bold tracking-[0.5em]">Personalize Induction Plate</span></div>
                  <button onClick={() => setShowPlateHelp(true)} className="font-ledger text-[10px] opacity-40 hover:underline tracking-widest uppercase">Tradition</button>
                </div>
                
                <div className="bg-[#E8D8C4] p-12 border border-[#724B39]/30 text-[#0C1519] text-center space-y-4 group shadow-inner relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#561C24]" />
                  <p className="font-ledger text-[9px] uppercase tracking-[1em] font-bold opacity-30">PRAEBARY PREMIUM ARCHIVE</p>
                  <div className="w-32 h-px bg-[#0C1519]/10 mx-auto" />
                  <p className="font-script text-4xl py-3 text-[#561C24]">{custodianName || "Custodian Signature"}</p>
                  <p className="font-ledger text-[8px] uppercase tracking-[0.5em] opacity-30 italic">Registry Cycle 2026 Induction</p>
                </div>

                <input type="text" placeholder="ENTER CUSTODIAN FULL NAME" value={custodianName} onChange={(e) => setCustodianName(e.target.value)} className="w-full bg-white/5 border border-white/10 px-8 py-6 font-ledger text-[11px] tracking-[0.3em] focus:outline-none focus:border-[#CF9D7B] transition-all text-[#E8D8C4] text-center" />
              </div>

              <div className="flex justify-between items-baseline text-[#CF9D7B]">
                <span className="font-ledger text-[11px] uppercase tracking-[0.8em] font-bold">Total Holding</span>
                <span className="text-6xl font-premium">₹{cart.reduce((s, b) => s + b.price, 0)}</span>
              </div>
              
              <button disabled={cart.length === 0} onClick={() => handleCheckout('order')} className="w-full bg-[#561C24] text-[#E8D8C4] py-10 font-ledger text-[11px] uppercase font-bold tracking-[0.6em] hover:bg-[#CF9D7B] hover:text-[#162127] transition-all disabled:opacity-20 shadow-2xl flex items-center justify-center gap-8">
                <Instagram size={32}/> Induct via Protocol
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- TOAST --- */}
      {showToast && (
        <div className="fixed top-32 left-1/2 -translate-x-1/2 z-[300] bg-[#561C24] text-[#E8D8C4] px-16 py-8 rounded-full shadow-[0_40px_100px_rgba(0,0,0,1)] flex items-center gap-8 border border-white/10 animate-in">
          <Check size={32} className="text-[#CF9D7B]" />
          <span className="font-ledger text-[15px] uppercase tracking-[1em] font-black">PROTOCOL ACTIVATED</span>
        </div>
      )}
    </main>
  );
}
