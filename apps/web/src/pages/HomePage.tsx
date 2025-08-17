import { Link } from 'react-router-dom';

import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';

export function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          TypeScript Monorepo Starter
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          A modern, production-ready monorepo with Fastify API, React web app, 
          authentication, and all the tools you need to build scalable applications.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link to="/register">Get Started</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/login">Sign In</Link>
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>🚀 Fast Setup</CardTitle>
            <CardDescription>
              Get up and running in minutes with pre-configured tooling
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-1">
              <li>• Turborepo monorepo structure</li>
              <li>• TypeScript across all packages</li>
              <li>• ESLint and Prettier configured</li>
              <li>• Vitest for testing</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>🔧 Modern Stack</CardTitle>
            <CardDescription>
              Built with the latest and greatest technologies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-1">
              <li>• Fastify + Apollo GraphQL API</li>
              <li>• React + Vite frontend</li>
              <li>• Drizzle ORM + PostgreSQL</li>
              <li>• TailwindCSS + Shadcn UI</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>🔐 Authentication Ready</CardTitle>
            <CardDescription>
              Complete authentication system out of the box
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-1">
              <li>• Better Auth integration</li>
              <li>• Protected routes</li>
              <li>• User management</li>
              <li>• Session handling</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}