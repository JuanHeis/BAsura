import { useState } from 'react'
import { MapPin, HelpCircle } from 'lucide-react'
import bacheame from '../assets/bacheame.webp'
import lla from '../assets/lla.webp'
import { Button } from '@/components/ui/button'
import { FaqDialog } from '@/components/FaqDialog'

export function Header(): React.JSX.Element {
  const [faqOpen, setFaqOpen] = useState(false)

  return (
    <>
      <header className="border-b-2 border-[#371859] bg-[#230552] shadow-lg">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Lado izquierdo: Logo + Titulo + Descripcion */}
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/15 text-white">
                <MapPin className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-white">
                  BAsura — Basura en la Via Publica (CABA)
                </h1>
                <p className="text-white/80">
                  Iniciativa de La Libertad Avanza CABA
                </p>
              </div>
            </div>

            {/* Centro: Boton de ayuda */}
            <Button variant="outline" size="sm" onClick={() => setFaqOpen(true)} className="border-white/30 text-white hover:bg-[#371859] hover:border-white/50 hover:text-white">
              <HelpCircle className="h-4 w-4 mr-2" />
              Ayuda
            </Button>

            {/* Lado derecho: Logos */}
            <div className="flex items-center gap-4">
              <img src={lla} alt="La Libertad Avanza" className="h-16 min-h-[60px] object-contain" />
              <img src={bacheame} alt="Bacheame App" className="h-14 object-contain" />
            </div>
          </div>
        </div>
      </header>
      <FaqDialog open={faqOpen} onOpenChange={setFaqOpen} />
    </>
  )
}

