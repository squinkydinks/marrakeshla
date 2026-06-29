export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-morocco-charcoal-light scroll-mt-20 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-morocco-amber mb-6">
              The Essence of Moroccan Hospitality
            </h2>
            <p className="text-lg mb-6 leading-relaxed text-morocco-givry">
              At Dar Dmana, we bring the rich culinary traditions of Morocco to your table. Our name, meaning "House of
              Trust" in Arabic, reflects our commitment to authentic flavors and exceptional service.
            </p>
            <p className="text-lg mb-6 leading-relaxed text-morocco-givry">
              Founded by Chef Hisham Foual, who learned the art of Moroccan cooking from his mother and later
              professionally trained in Morocco learning french and italian cuisines, Dar Dmana combines time-honored
              recipes with modern catering excellence.
            </p>
            <p className="text-lg leading-relaxed text-morocco-givry">
              Every dish we prepare tells a story of Morocco's diverse cultural heritage, from the imperial cities to
              the Atlas Mountains and coastal regions. We use only the finest ingredients, including hand-selected
              spices imported directly from Moroccan souks.
            </p>
          </div>
          <div className="md:w-1/2 grid grid-cols-2 gap-4">
            <div className="aspect-square rounded-lg overflow-hidden">
              <video
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6414-sXcN7l4773sVRlm7ji1pehvTtke6bF.MOV"
                className="w-full h-full object-cover"
                controls
                muted
                playsInline
                loop
                autoPlay
              >
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="aspect-square rounded-lg overflow-hidden mt-8">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8E7C226D-97D9-4114-9D98-7AE883FD63A1.jpg-ZAapvW9M3b2fsSWjbTATCf8nbzsdPB.jpeg"
                alt="Traditional Moroccan spice containers with decorative lids"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FullSizeRender.JPG-mcDV2qZCPM1E68DiB6ZpQl6XzPDQE1.jpeg"
                alt="Authentic Moroccan tagine with couscous and vegetables"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden mt-8">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/jocelyn-towne-hicham.jpg-x3re4CjJbW7A2BGdKFAjKcbfaETwvA.jpeg"
                alt="Chef Hisham with a client in a kitchen setting"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
