export default function Footer() {
    return (
        <footer className="text-2xl bg-gray-800 max-h-80 py-4 text-white flex flex-col items-center justify-center">
            <div className="mb-2">
                <p>&copy; {new Date().getFullYear()} Marketverse. All rights reserved.</p>
            </div>
            <div className="mb-2">
                <a href="/terms" className="hover:underline">Terms of Service</a> | 
                <a href="/privacy" className="hover:underline">Privacy Policy</a>
            </div>
            <div>
                <p>Follow us on social media:</p>
                <a href="https://www.facebook.com" className="hover:underline">Facebook</a> | 
                <a href="https://www.twitter.com" className="hover:underline">Twitter</a> | 
                <a href="https://www.instagram.com" className="hover:underline">Instagram</a>
            </div>
        </footer>
    );
}
