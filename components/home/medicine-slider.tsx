'use client'

import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Check, Sparkles } from 'lucide-react'
import Link from 'next/link'

interface Medicine {
  id: string
  name: string
  slug: string
  category: string
  categoryColor: string
  description: string
  benefits: string[]
  image: string
  gradient: string
}

const medicines: Medicine[] = [
  {
    id: '1',
    name: 'Zopiclone 7.5mg',
    slug: 'zopiclone-7-5mg',
    category: 'Sleep Support',
    categoryColor: 'from-indigo-500 to-purple-600',
    description: 'A trusted sleep aid designed to help you fall asleep faster and enjoy deeper, more restful sleep throughout the night.',
    benefits: [
      'Reduces time to fall asleep significantly',
      'Promotes uninterrupted, quality sleep',
      'Helps maintain healthy sleep patterns',
      'Non-habit forming when used as directed'
    ],
    image: '/images/medicines/sleep-aid.png',
    gradient: 'from-indigo-50 via-purple-50 to-blue-50'
  },
  {
    id: '2',
    name: 'Co-Codamol 30/500',
    slug: 'co-codamol-30-500',
    category: 'Pain Relief',
    categoryColor: 'from-rose-500 to-orange-500',
    description: 'Powerful dual-action pain relief combining paracetamol and codeine for effective management of moderate to severe pain.',
    benefits: [
      'Fast-acting pain relief within 30 minutes',
      'Effective for headaches, dental pain & injuries',
      'Reduces inflammation and discomfort',
      'Long-lasting relief up to 6 hours'
    ],
    image: '/images/medicines/pain-relief.png',
    gradient: 'from-rose-50 via-orange-50 to-amber-50'
  },
  {
    id: '3',
    name: 'Diazepam 10mg',
    slug: 'diazepam-10mg',
    category: 'Anxiety Relief',
    categoryColor: 'from-emerald-500 to-teal-600',
    description: 'Clinically proven medication for managing anxiety, muscle spasms, and promoting relaxation during stressful periods.',
    benefits: [
      'Reduces anxiety and tension effectively',
      'Relieves muscle spasms and stiffness',
      'Promotes calm and mental clarity',
      'Helps manage panic disorders'
    ],
    image: '/images/medicines/anxiety-relief.png',
    gradient: 'from-emerald-50 via-teal-50 to-cyan-50'
  },
  {
    id: '4',
    name: 'Tramadol 50mg',
    slug: 'tramadol-50mg',
    category: 'Pain Management',
    categoryColor: 'from-blue-500 to-cyan-600',
    description: 'A powerful opioid analgesic for treating moderate to moderately severe pain, providing reliable and consistent relief.',
    benefits: [
      'Effective for chronic pain conditions',
      'Works on multiple pain pathways',
      'Extended release formulations available',
      'Suitable for post-surgical recovery'
    ],
    image: '/images/medicines/tramadol.png',
    gradient: 'from-blue-50 via-cyan-50 to-sky-50'
  },
  {
    id: '5',
    name: 'Pregabalin 300mg',
    slug: 'pregabalin-300mg',
    category: 'Nerve Pain',
    categoryColor: 'from-violet-500 to-fuchsia-600',
    description: 'Specialized medication for neuropathic pain, fibromyalgia, and anxiety disorders with proven clinical efficacy.',
    benefits: [
      'Targets nerve-related pain specifically',
      'Reduces fibromyalgia symptoms',
      'Helps with generalized anxiety',
      'Improves sleep quality in pain patients'
    ],
    image: '/images/medicines/pregabalin.png',
    gradient: 'from-violet-50 via-fuchsia-50 to-pink-50'
  },
  {
    id: '6',
    name: 'Modafinil 200mg',
    slug: 'modafinil-200mg',
    category: 'Focus & Energy',
    categoryColor: 'from-amber-500 to-yellow-500',
    description: 'A wakefulness-promoting agent that enhances cognitive function, focus, and alertness for improved productivity.',
    benefits: [
      'Promotes sustained wakefulness',
      'Enhances cognitive performance',
      'Reduces fatigue and drowsiness',
      'Non-jittery energy boost'
    ],
    image: '/images/medicines/modafinil.png',
    gradient: 'from-amber-50 via-yellow-50 to-orange-50'
  }
]

export function MedicineSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState<'left' | 'right'>('right')

  const goToSlide = useCallback((index: number, dir: 'left' | 'right' = 'right') => {
    if (isAnimating) return
    setIsAnimating(true)
    setDirection(dir)
    setCurrentSlide(index)
    setTimeout(() => setIsAnimating(false), 600)
  }, [isAnimating])

  const nextSlide = useCallback(() => {
    const next = (currentSlide + 1) % medicines.length
    goToSlide(next, 'right')
  }, [currentSlide, goToSlide])

  const prevSlide = useCallback(() => {
    const prev = (currentSlide - 1 + medicines.length) % medicines.length
    goToSlide(prev, 'left')
  }, [currentSlide, goToSlide])

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(nextSlide, 6000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide()
      if (e.key === 'ArrowRight') nextSlide()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextSlide, prevSlide])

  const currentMedicine = medicines[currentSlide]

  return (
    <section
      className="relative overflow-hidden py-16 lg:py-24"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${currentMedicine.gradient} transition-all duration-700`} />

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-secondary/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/30 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-white/40 mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-secondary">Featured Medications</span>
          </div>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-secondary mb-4">
            Trusted Health Solutions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our carefully selected range of pharmaceutical products, each designed to improve your health and wellbeing
          </p>
        </div>

        {/* Slider Content */}
        <div className="relative">
          {/* Main Card */}
          <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl border border-white/50 shadow-2xl shadow-black/5 overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Image Section */}
              <div className="relative h-[300px] lg:h-[500px] bg-gradient-to-br from-white/50 to-white/30 flex items-center justify-center p-8 lg:p-12">
                {/* Floating circles decoration */}
                <div className="absolute top-8 left-8 w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full animate-float" />
                <div className="absolute bottom-12 right-12 w-16 h-16 bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
                <div className="absolute top-1/2 right-8 w-12 h-12 bg-gradient-to-br from-accent/30 to-accent/10 rounded-full animate-float" style={{ animationDelay: '1s' }} />

                {/* Medicine Image Placeholder */}
                <div
                  className={`relative z-10 transition-all duration-700 ${
                    isAnimating
                      ? direction === 'right'
                        ? 'opacity-0 translate-x-8'
                        : 'opacity-0 -translate-x-8'
                      : 'opacity-100 translate-x-0'
                  }`}
                >
                  <div className="relative">
                    {/* Glow effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${currentMedicine.categoryColor} opacity-20 blur-3xl scale-150`} />

                    {/* Product visual representation */}
                    <div className="relative w-48 h-48 lg:w-72 lg:h-72 bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl flex items-center justify-center animate-float-slow">
                      <div className={`w-32 h-32 lg:w-48 lg:h-48 bg-gradient-to-br ${currentMedicine.categoryColor} rounded-2xl shadow-lg flex items-center justify-center`}>
                        <div className="text-white text-center p-4">
                          <div className="text-3xl lg:text-4xl font-bold mb-1">Rx</div>
                          <div className="text-xs lg:text-sm opacity-90">{currentMedicine.category}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div
                  className={`transition-all duration-700 ${
                    isAnimating
                      ? 'opacity-0 translate-y-4'
                      : 'opacity-100 translate-y-0'
                  }`}
                >
                  {/* Category Badge */}
                  <div className="mb-4">
                    <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium text-white bg-gradient-to-r ${currentMedicine.categoryColor} shadow-lg`}>
                      {currentMedicine.category}
                    </span>
                  </div>

                  {/* Medicine Name */}
                  <h3 className="font-serif text-3xl lg:text-4xl font-bold text-secondary mb-4">
                    {currentMedicine.name}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                    {currentMedicine.description}
                  </p>

                  {/* Benefits */}
                  <div className="space-y-3 mb-8">
                    {currentMedicine.benefits.map((benefit, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3"
                        style={{
                          transitionDelay: `${index * 100}ms`,
                          opacity: isAnimating ? 0 : 1,
                          transform: isAnimating ? 'translateX(-10px)' : 'translateX(0)',
                          transition: 'all 0.5s ease-out'
                        }}
                      >
                        <div className={`flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r ${currentMedicine.categoryColor} flex items-center justify-center mt-0.5`}>
                          <Check className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="text-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href={`/product/${currentMedicine.slug}`}
                      className={`inline-flex items-center px-8 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r ${currentMedicine.categoryColor} hover:shadow-xl hover:scale-105 transition-all duration-300`}
                    >
                      Shop Now
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Link>
                    <Link
                      href={`/product/${currentMedicine.slug}`}
                      className="inline-flex items-center px-8 py-3.5 rounded-xl font-semibold text-secondary bg-white/80 border border-secondary/20 hover:bg-white hover:border-secondary/40 transition-all duration-300"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 lg:w-14 lg:h-14 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-secondary hover:bg-white hover:scale-110 transition-all duration-300 z-20"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 lg:w-14 lg:h-14 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-secondary hover:bg-white hover:scale-110 transition-all duration-300 z-20"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dot Indicators */}
        <div className="flex items-center justify-center gap-3 mt-8">
          {medicines.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index, index > currentSlide ? 'right' : 'left')}
              className={`relative h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'w-10 bg-gradient-to-r from-primary to-secondary'
                  : 'w-3 bg-secondary/30 hover:bg-secondary/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            >
              {index === currentSlide && (
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary animate-pulse" />
              )}
            </button>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mt-6 max-w-md mx-auto">
          <div className="h-1 bg-secondary/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
              style={{
                width: `${((currentSlide + 1) / medicines.length) * 100}%`
              }}
            />
          </div>
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>{currentSlide + 1} of {medicines.length}</span>
            <span>{isAutoPlaying ? 'Auto-playing' : 'Paused'}</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
