
import React from "react";
import { Hammer, Phone, Mail, Ruler, Paintbrush, Layers, MapPin, Clock, Star, ChevronRight } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";

const Nav = () => (
  <header className="sticky">
    <div className="container" style={{height:'64px', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
      <a href="#home" style={{display:'flex', alignItems:'center', gap:'12px'}}>
        <img src="/logo.png" alt="DreamWorks Cabinetry Logo" style={{height:'40px'}} />
        <div>
          <div style={{fontSize:'1.1rem', fontWeight:600}}>DreamWorks Cabinetry</div>
          <div className="muted" style={{fontSize:'.75rem'}}>The Dream is in the Details</div>
        </div>
      </a>
      <nav className="muted" style={{display:'none'}}>
        {/* You can add nav links here if desired */}
      </nav>
      <div style={{display:'flex', gap:'8px'}}>
        <a href="tel:+12566743373" className="btn primary"><Phone size={16}/> Call</a>
        <a href="#quote" className="btn outline">Get a Quote</a>
      </div>
    </div>
  </header>
);

const Hero = () => (
  <section id="home" className="hero">
    <div className="bg" style={{backgroundImage:"url('https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=2400&auto=format&fit=crop')"}} />
    <div className="overlay" />
    <div className="inner">
      <div className="container" style={{color:'#fff'}}>
        <div style={{maxWidth:'720px'}}>
          <h1 style={{fontSize:'44px', lineHeight:1.1, fontWeight:600, margin:0}}>Hand-built cabinetry, crafted to last a lifetime</h1>
          <p style={{marginTop:'14px', fontSize:'18px', opacity:.95}}>Kitchens, vanities, built-ins, and custom millwork — designed, built, and finished in North Alabama.</p>
          <div style={{marginTop:'18px', display:'flex', gap:'10px'}}>
            <a className="btn primary" href="#quote">Get a free quote</a>
            <a className="btn outline" href="#work">See our work</a>
          </div>
          <div style={{marginTop:'16px', display:'flex', gap:'16px', opacity:.95}}>
            <span style={{display:'inline-flex', alignItems:'center', gap:6}}><Star size={16}/> Family-owned • 15+ years</span>
            <span style={{display:'inline-flex', alignItems:'center', gap:6}}><Clock size={16}/> On-time installs</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Tag = ({ children }) => (<span className="tag">{children}</span>);

const Work = () => (
  <section id="work" style={{background:'#f8fafc'}} className="section">
    <div className="container">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', gap:'1rem'}}>
        <div>
          <Tag>Portfolio</Tag>
          <h2 style={{margin:'8px 0 0', fontSize:'32px', fontWeight:600}}>Recent Projects</h2>
          <p className="muted" style={{maxWidth:'48ch'}}>A selection of our kitchens, built-ins, and custom cabinetry projects.</p>
        </div>
        <a href="#gallery" className="btn outline">View full gallery</a>
      </div>
      <div id="highlights" className="grid cols-3" style={{marginTop:'16px'}}>
        {[
          {src:"/portfolio/white-kitchen.jpg", desc:"Custom White Shaker Kitchen – Huntsville, AL"},
          {src:"/portfolio/navy-kitchen.jpg", desc:"Navy Kitchen with Gold Hardware – Scottsboro, AL"},
          {src:"/portfolio/gray-kitchen.jpg", desc:"Large Gray Kitchen with Granite – Fort Payne, AL"},
          {src:"/portfolio/library.jpg", desc:"Cherry Built-in Bookcase – Valley Head, AL"},
          {src:"/portfolio/black-kitchen.jpg", desc:"Modern Black Cabinets with Gold Pulls – Chattanooga, TN"},
          {src:"/portfolio/white-wood-accent.jpg", desc:"White Kitchen with Wood Accents – Mentone, AL"},
          {src:"/portfolio/distressed.jpg", desc:"Rustic Distressed Finish – Farmhouse Style"},
          {src:"/portfolio/closet.jpg", desc:"Walk-in Closet Cabinetry – North Alabama"},
          {src:"/portfolio/bar.jpg", desc:"Gray Bar with Wine Rack – Custom Project"}
        ].map((item, i) => (
          <Card key={i} className="card">
            <div className="aspect-4-3" style={{backgroundImage:`url(${item.src})`}}></div>
            <CardContent><div className="muted" style={{fontSize:'.9rem'}}>{item.desc}</div></CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

const Gallery = () => {
  const [files, setFiles] = React.useState(null);
  const [error, setError] = React.useState(null);
  React.useEffect(() => {
    (async () => {
      try{
        const res = await fetch('/gallery/index.json', { cache: 'no-store' });
        if(!res.ok) throw new Error('missing index');
        const list = await res.json();
        setFiles(list);
      }catch(e){ setError('missing'); }
    })();
  }, []);
  return (
    <section id="gallery" className="section">
      <div className="container">
        <Tag>Gallery</Tag>
        <h2 style={{margin:'8px 0 0', fontSize:'32px', fontWeight:600}}>Full Project Gallery</h2>
        <p className="muted">Drop photos into <code>/public/gallery</code> and update <code>index.json</code> — they’ll appear here.</p>
        {error && (
          <div className="gallery-setup card-content" style={{marginTop:'12px', borderRadius:'12px'}}>
            <div style={{fontWeight:600, marginBottom:'6px'}}>First-time setup</div>
            <ol style={{marginLeft:'1rem'}}>
              <li>Create <code>/public/gallery</code>.</li>
              <li>Add images (JPG/PNG/WebP).</li>
              <li>Create <code>/public/gallery/index.json</code> like <code>["kitchen-1.jpg","closet-1.jpg"]</code>.</li>
            </ol>
          </div>
        )}
        {files && (
          <div className="grid cols-3" style={{marginTop:'16px'}}>
            {files.map((name) => (
              <div key={name} className="card">
                <div className="aspect-4-3" style={{backgroundImage:`url(/gallery/${name})`}}></div>
              </div>
            ))}
          </div>
        )}
        <div className="card" style={{marginTop:'16px'}}>
          <div className="card-content" style={{fontSize:'.85rem'}}>
            <div style={{fontWeight:600, marginBottom:'6px'}}>Optional: Auto‑build the gallery list</div>
            <pre style={{whiteSpace:'pre-wrap'}}>{`// scripts/build-gallery-index.mjs
// Run: npm run gallery
import { promises as fs } from 'fs';
import path from 'path';
const dir = path.join(process.cwd(), 'public', 'gallery');
const files = (await fs.readdir(dir)).filter(f => /\\.(jpe?g|png|webp)$/i.test(f));
await fs.writeFile(path.join(dir, 'index.json'), JSON.stringify(files, null, 2));
console.log('Wrote', files.length, 'items to /public/gallery/index.json');`}</pre>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => (
  <section id="contact" className="section" style={{background:'#f8fafc'}}>
    <div className="container">
      <div className="grid cols-2">
        <div>
          <Tag>Get in touch</Tag>
          <h2 style={{margin:'8px 0 0', fontSize:'32px', fontWeight:600}}>Request a quote</h2>
          <p className="muted">Tell us about your project and we’ll get back within 1–2 business days.</p>
          <div style={{marginTop:'10px', fontSize:'.95rem'}}>
            <div><Phone size={16}/> <a href="tel:+12566743373">(256) 674‑3373 · Juan Gonzalez | (256) 996‑3114 · Philip McElhaney</a></div>
            <div><Mail size={16}/> <a href="mailto:mcelhaneyphilip@gmail.com">mcelhaneyphilip@gmail.com</a></div>
            <div><MapPin size={16}/> 47141 US HIGHWAY 11, Valley Head, AL 35989</div>
          </div>
        </div>
        <div>
          <form id="quote" className="card-content" style={{border:'1px solid #e5e7eb', borderRadius:'1rem'}}>
            <div className="grid cols-2">
              <Input placeholder="Name" />
              <Input placeholder="Email" type="email" />
              <Input placeholder="Phone" />
              <Input placeholder="City / Area" />
            </div>
            <Input placeholder="Project type (kitchen, vanity, built‑in…)" />
            <Textarea placeholder="Tell us about your space, dimensions, timeline, and style…" rows={5} />
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <div className="muted" style={{fontSize:'.75rem'}}>By sending, you agree to be contacted about your project.</div>
              <a className="btn primary" href="mailto:mcelhaneyphilip@gmail.com">Send request</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer>
    <div className="container" style={{padding:'2rem 0', fontSize:'.9rem'}}>
      <div style={{display:'flex', justifyContent:'space-between', gap:'1rem', alignItems:'center', flexWrap:'wrap'}}>
        <div>
          <div style={{fontWeight:600}}>DreamWorks Cabinetry</div>
          <div className="muted">47141 US HIGHWAY 11, Valley Head, AL 35989 • Serving North Alabama & beyond</div>
        </div>
        <div style={{display:'flex', gap:'1rem'}}>
          <a href="#work" className="muted">Work</a>
          <a href="#contact" className="muted">Contact</a>
          <a href="#gallery" className="muted">Gallery</a>
        </div>
      </div>
      <div style={{marginTop:'12px'}} className="muted">© {new Date().getFullYear()} DreamWorks Cabinetry. All rights reserved.</div>
    </div>
  </footer>
);

export default function HomePage(){
  return (
    <main>
      <Nav />
      <Hero />
      <Work />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  );
}
