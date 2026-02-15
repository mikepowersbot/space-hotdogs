import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/navigation";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium">
            🚀 Now Serving Earth & Beyond
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-gray-900">
            Hotdogs from
            <br />
            <span className="text-blue-600">Another Dimension</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Experience the cosmic flavor of space-grade hotdogs. Zero-gravity grilled with
            alien-proof recipes that are truly out of this world.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6 rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              🛸 Order Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 text-lg px-8 py-6 rounded-lg"
            >
              ✨ View Full Menu
            </Button>
          </div>

          <div className="mt-16">
            <div className="max-w-4xl mx-auto rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-white p-12 text-center">
              <div className="text-8xl mb-6">🌭🚀</div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">The Cosmic Dog</h3>
              <p className="text-gray-600 text-lg">
                Our signature space hotdog, grilled to perfection in zero-gravity ovens,
                topped with meteor mustard and comet cheese.
              </p>
              <div className="mt-6 inline-block px-6 py-3 bg-blue-50 rounded-full text-blue-600 font-medium">
                ⭐ 4.9/5 from 2,847 astronauts
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Why Choose Space Hotdogs?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The future of hotdogs is here. And it's delicious.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🛰️</div>
                <CardTitle className="text-gray-900">Zero-Gravity Grilled</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-base">
                  Our proprietary orbital grilling technology ensures perfect sear marks
                  and even cooking in microgravity conditions.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">👽</div>
                <CardTitle className="text-gray-900">Alien-Proof Recipe</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-base">
                  Tested and approved by actual astronauts and extraterrestrial taste
                  testers from 12 different star systems.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">⭐</div>
                <CardTitle className="text-gray-900">Interstellar Fresh</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-base">
                  Sourced from organic nebula farms and delivered via hyperloop
                  teleportation for maximum freshness and flavor.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">⚡</div>
                <CardTitle className="text-gray-900">Rocket-Fast Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-base">
                  From our orbital kitchens to your doorstep in under 30 minutes
                  using reusable rocket technology.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white border-gray-200 shadow-md">
            <CardHeader className="text-center">
              <CardTitle className="text-4xl font-bold text-gray-900 mb-4">
                Ready for Takeoff?
              </CardTitle>
              <CardDescription className="text-xl text-gray-600">
                Join thousands of satisfied customers across the galaxy
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center pb-8">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-10 py-6 rounded-lg shadow-md hover:shadow-lg"
              >
                🚀 Order Space Hotdogs
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 text-lg px-10 py-6 rounded-lg"
              >
                🌟 Find a Location
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌭</span>
            <span className="text-xl font-bold text-gray-900">Space Hotdogs</span>
          </div>
          <p className="text-gray-600 text-sm">
            © 2024 Space Hotdogs Inc. est. 2157. All rights reserved across all dimensions.
          </p>
          <div className="flex gap-4">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
              Privacy
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
              Terms
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
              Contact
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}