import ContactForm from '@/components/custom/contact-form';
import { socialLinksData, aboutMe } from '@/lib/portfolio-data';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ContactSection() {
  return (
    <section id="contact">
      <div className="container">
        <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-10 text-primary">
          Get In Touch
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Send me a message</CardTitle>
              <CardDescription>I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.</CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
          
          <div className="space-y-6">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <p className="text-muted-foreground">Feel free to reach out via email or connect with me on social media.</p>
                    {/* <p><span className="font-semibold">Email:</span> <a href={`mailto:${aboutMe.name.split(' ')[0].toLowerCase()}@example.com`} className="text-primary hover:underline">{`${aboutMe.name.split(' ')[0].toLowerCase()}@example.com`}</a> (placeholder)</p> */}
                    <p><span className="font-semibold">Email:</span> <a href="mailto:aboutMe.email" className="text-primary hover:underline">{aboutMe.email}</a> </p>
                    <p><span className="font-semibold">Location:</span> Noida</p>
                </CardContent>
            </Card>

            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Connect With Me</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex space-x-3">
                    {socialLinksData.map((social) => (
                        <Button key={social.name} variant="outline" size="icon" asChild className="transition-transform hover:scale-110 hover:border-primary">
                        <Link href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
                            <social.icon className="h-5 w-5" />
                        </Link>
                        </Button>
                    ))}
                    </div>
                </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
