import { Facebook, Twitter, Github } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export default function Footer() {
  return (
    <footer className="bg-background text-foreground">
      <Separator className="" />
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-8">
            <div className="flex items-center space-x-2">
              <img src="./src/assets/icon96.png" alt="CreditEye" className="h-8 w-8" />
              <span className="text-2xl font-bold">CreditEye</span>
            </div>
            <p className="text-muted-foreground">
              Making credit verification simple.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <a href="#" aria-label="Facebook">
                  <Facebook className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="#" aria-label="Twitter">
                  <Twitter className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://github.com/v3gaaa/reto-softek" aria-label="GitHub">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Button variant="link" asChild>
                  <a href="/about">About</a>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild>
                  <a href="#">Partners</a>
                </Button>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Button variant="link" asChild>
                  <a href="/api-status">API Status</a>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild>
                  <a href="#">Technologies</a>
                </Button>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <form className="space-y-2">
              <Input type="email" placeholder="Enter your email" />
              <Button type="submit" className="w-full">Subscribe</Button>
            </form>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            &copy; 2023 CreditEye, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
