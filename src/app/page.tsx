import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900">
      {/* Stars Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-indigo-900/10 to-slate-900/30" />
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🌭</span>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
              Space Hotdogs
            </span>
          </div>
          <Button variant="outline" className="border-purple-400 text-purple-200 hover:bg-purple-900/50">
            Menu
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-24 text-center">
        <div className="max-w-5xl mx-auto">
          <div className="inline-block mb-6 px-4 py-2 rounded-full bg-purple-900/50 border border-purple-500/30 text-purple-200 text-sm font-medium">
            🚀 Now Serving Earth & Beyond
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent">
              Hotdogs from
            </span>
            <br />
            <span className="text-white">Another Dimension</span>
          </h1>

          <p className="text-xl md:text-2xl text-purple-200 mb-12 max-w-3xl mx-auto leading-relaxed">
            Experience the cosmic flavor of space-grade hotdogs. Zero-gravity grilled with
            alien-proof recipes that are truly out of this world.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white text-lg px-8 py-6 rounded-full shadow-lg shadow-purple-500/50 transform hover:scale-105 transition-all"
            >
              🛸 Order Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-cyan-400 text-cyan-300 hover:bg-cyan-900/30 text-lg px-8 py-6 rounded-full"
            >
              ✨ View Full Menu
            </Button>
          </div>

          <div className="mt-16 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 via-transparent to-transparent z-10" />
            <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden border-2 border-purple-500/30 shadow-2xl shadow-purple-900/50 bg-gradient-to-br from-purple-900/40 to-indigo-900/40 backdrop-blur-sm">
              <div className="p-12 text-center">
                <div className="text-8xl mb-6">🌭🚀</div>
                <h3 className="text-3xl font-bold text-white mb-4">The Cosmic Dog</h3>
                <p className="text-purple-200 text-lg">
                  Our signature space hotdog, grilled to perfection in zero-gravity ovens,
                  topped with meteor mustard and comet cheese.
                </p>
                <div className="mt-6 inline-block px-6 py-3 bg-purple-800/50 rounded-full text-purple-100">
                  ⭐ 4.9/5 from 2,847 astronauts
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Choose Space Hotdogs?
            </h2>
            <p className="text-xl text-purple-200">
              The future of hotdogs is here. And it&apos;s delicious.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-purple-500/30 backdrop-blur-sm hover:border-purple-400 transition-all group">
              <CardHeader>
                <div className="text-4xl mb-2">🛰️</div>
                <CardTitle className="text-white group-hover:text-purple-300 transition-colors">
                  Zero-Gravity Grilled
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-purple-200 text-base">
                  Our proprietary orbital grilling technology ensures perfect sear marks
                  and even cooking in microgravity conditions.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-indigo-900/50 to-blue-900/50 border-indigo-500/30 backdrop-blur-sm hover:border-indigo-400 transition-all group">
              <CardHeader>
                <div className="text-4xl mb-2">👽</div>
                <CardTitle className="text-white group-hover:text-indigo-300 transition-colors">
                  Alien-Proof Recipe
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-indigo-200 text-base">
                  Tested and approved by actual astronauts and extraterrestrial taste
                  testers from 12 different star systems.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-500/30 backdrop-blur-sm hover:border-blue-400 transition-all group">
              <CardHeader>
                <div className="text-4xl mb-2">⭐</div>
                <CardTitle className="text-white group-hover:text-blue-300 transition-colors">
                  Interstellar Fresh
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-blue-200 text-base">
                  Sourced from organic nebula farms and delivered via hyperloop
                  teleportation for maximum freshness and flavor.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-cyan-900/50 to-teal-900/50 border-cyan-500/30 backdrop-blur-sm hover:border-cyan-400 transition-all group">
              <CardHeader>
                <div className="text-4xl mb-2">⚡</div>
                <CardTitle className="text-white group-hover:text-cyan-300 transition-colors">
                  Rocket-Fast Delivery
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-cyan-200 text-base">
                  From our orbital kitchens to your doorstep in under 30 minutes
                  using reusable rocket technology.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-24">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-purple-900/60 to-pink-900/60 border-purple-500/40 backdrop-blur-md overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent" />
            <CardHeader className="text-center relative z-10">
              <CardTitle className="text-4xl md:text-5xl font-bold text-white mb-4">
                Ready for Takeoff?
              </CardTitle>
              <CardDescription className="text-purple-200 text-xl">
                Join thousands of satisfied customers across the galaxy
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center relative z-10 pb-8">
              <Button
                size="lg"
                className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white text-lg px-10 py-6 rounded-full shadow-lg shadow-purple-500/50"
              >
                🚀 Order Space Hotdogs
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-purple-400 text-purple-300 hover:bg-purple-900/30 text-lg px-10 py-6 rounded-full"
              >
                🌟 Find a Location
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 border-t border-purple-800/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌭</span>
            <span className="text-xl font-bold text-purple-300">Space Hotdogs</span>
          </div>
          <p className="text-purple-300 text-sm">
            © 2024 Space Hotdogs Inc.est. 2157. All rights reserved across all dimensions.
          </p>
          <div className="flex gap-4">
            <Button variant="ghost" size="sm" className="text-purple-300 hover:text-white">
              Privacy
            </Button>
            <Button variant="ghost" size="sm" className="text-purple-300 hover:text-white">
              Terms
            </Button>
            <Button variant="ghost" size="sm" className="text-purple-300 hover:text-white">
              Contact
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
