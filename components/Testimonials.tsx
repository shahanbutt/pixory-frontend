export default function Testimonials() {
  return (
    <section className="py-20 px-6 bg-gray-50 relative">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-black text-center mb-16">
          Loved by thousands of PrintiQue Fans!
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-black mb-4">Absolutely stunning!</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              "Just got my PrintiQue photobook and it's absolutely stunning! It looks so stylish on my coffee table and really complements my decor. I've been showing it off to everyone and have already recommended it to my friends—it's a must-have for anyone who loves beautiful keepsakes!"
            </p>
            <div className="font-semibold text-black">Christine</div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-black mb-4">The perfect way to relive my travels</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              "I'm obsessed with my photobooks from PrintiQue! They're the perfect way to relive my travels and I already can't wait to make another after my next trip. The quality is stunning and I love how I could fully customise the design to fit my aesthetic. It's the perfect addition to my coffee table!"
            </p>
            <div className="font-semibold text-black">Ella S</div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-black mb-4">The process was super easy</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              "So excited to share my PrintiQue photobook from my last vacation! 🏝️🌊 It turned out even better than I imagined. The process was super easy and the book is absolutely gorgeous. Highly recommend for any travel lover!"
            </p>
            <div className="font-semibold text-black">Sienna</div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-6 left-6 text-xs font-bold text-black">TESTIMONIALS</div>
    </section>
  )
}
