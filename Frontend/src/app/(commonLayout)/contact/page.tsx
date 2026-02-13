import { Phone, Mail, MapPin, Clock, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
export const dynamic = "force-dynamic";
export default function ContactPage() {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">Contact Our Pharmacists</h1>
          <p className="text-muted-foreground text-lg">
            Have a question about your medication or need to check stock? 
            Our medical team is here to help you 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-blue-100 dark:border-slate-800">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Phone className="size-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold">Emergency Hotline</h3>
                  <p className="text-xl font-black text-blue-600">+880 1XXX-XXXXXX</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Available 24/7 for urgent medical inquiries.</p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <MapPin className="size-6 text-primary shrink-0" />
                  <div>
                    <h3 className="font-bold">Our Location</h3>
                    <p className="text-sm text-muted-foreground">123 Health Avenue, Medical Zone, Dhaka, Bangladesh</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Clock className="size-6 text-primary shrink-0" />
                  <div>
                    <h3 className="font-bold">Pharmacy Hours</h3>
                    <p className="text-sm text-muted-foreground">Mon - Sat: 8:00 AM - 11:00 PM</p>
                    <p className="text-sm text-muted-foreground">Sunday: 10:00 AM - 8:00 PM</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Mail className="size-6 text-primary shrink-0" />
                  <div>
                    <h3 className="font-bold">Email Support</h3>
                    <p className="text-sm text-muted-foreground">orders@medicare.com</p>
                    <p className="text-sm text-muted-foreground">consult@medicare.com</p>
                  </div>
                </div>
              </div>
            </div>

            <Button className="w-full h-14 bg-green-600 hover:bg-green-700 text-white rounded-2xl gap-2 text-lg">
              <MessageSquare className="size-5" /> Chat on WhatsApp
            </Button>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 h-full">
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <Input placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number</label>
                  <Input placeholder="+880 1XXX-XXXXXX" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium">Subject</label>
                  <Input placeholder="Prescription Inquiry / Stock Check" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium">Message</label>
                  <Textarea 
                    placeholder="Tell us what you need. If inquiring about a medicine, please mention the brand name and dosage." 
                    className="min-h-37.5"
                  />
                </div>
                <div className="md:col-span-2">
                  <Button className="w-full md:w-max px-8 h-12 gap-2">
                    <Send className="size-4" /> Send Message
                  </Button>
                </div>
              </form>
            </div>
          </div>

        </div>

        <div className="mt-12 w-full h-100 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14602.254272231177!2d90.3654215!3d23.7985508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c0b9613144df%3A0x6475d42171e2e171!2sDhaka!5e0!3m2!1sen!2sbd!4v1710000000000!5m2!1sen!2sbd" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}