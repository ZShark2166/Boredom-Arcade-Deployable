function openBlankCloaker() {
    const newTab = window.open('about:blank', '_blank');

    newTab.document.title = 'Boredom V1'; 

    const link = newTab.document.createElement('link');
    link.rel = 'icon';
    link.href = 'favicon.ico';

    newTab.document.head.appendChild(link);

    newTab.document.body.style.margin = '0';
    newTab.document.body.style.padding = '0';
    newTab.document.body.style.height = '100vh';
    newTab.document.body.style.overflow = 'hidden';

    const iframe = newTab.document.createElement('iframe');
    iframe.src = 'index.html';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.display = 'block';

    newTab.document.body.appendChild(iframe);
    window.location.replace('https://classroom.google.com/');
}
function toggleMenu() {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('active');
}

const quotes = [
    "The only way to do great work is to love what you do. - Steve Jobs",
    "In three words I can sum up everything I've learned about life: it goes on. - Robert Frost",
    "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment. - Ralph Waldo Emerson",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston S. Churchill",
    "Life is what happens when you're busy making other plans. - John Lennon",
    "The purpose of our lives is to be happy. - Dalai Lama",
    "Get busy living or get busy dying. - Stephen King",
    "You only live once, but if you do it right, once is enough. - Mae West",
    "The greatest glory in living lies not in never falling, but in rising every time we fall. - Nelson Mandela",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "Life is either a daring adventure or nothing at all. - Helen Keller",
    "You miss 100% of the shots you don’t take. - Wayne Gretzky",
    "It does not matter how slowly you go as long as you do not stop. - Confucius",
    "What lies behind us and what lies before us are tiny matters compared to what lies within us. - Ralph Waldo Emerson",
    "Your time is limited, so don’t waste it living someone else’s life. - Steve Jobs",
    "The best way to predict the future is to create it. - Peter Drucker",
    "The journey of a thousand miles begins with one step. - Lao Tzu",
    "Believe you can and you're halfway there. - Theodore Roosevelt",
    "Act as if what you do makes a difference. It does. - William James",
    "Success usually comes to those who are too busy to be looking for it. - Henry David Thoreau",
    "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
    "If you want to live a happy life, tie it to a goal, not to people or things. - Albert Einstein",
    "Success is walking from failure to failure with no loss of enthusiasm. - Winston S. Churchill",
    "The mind is everything. What you think you become. - Buddha",
    "Life is 10% what happens to us and 90% how we react to it. - Charles R. Swindoll",
    "Your limitation—it's only your imagination. - Unknown",
    "Push yourself, because no one else is going to do it for you. - Unknown",
    "Great things never come from comfort zones. - Unknown",
    "Dream it. Wish it. Do it. - Unknown",
    "Success doesn’t just find you. You have to go out and get it. - Unknown",
    "The harder you work for something, the greater you’ll feel when you achieve it. - Unknown",
    "Dream bigger. Do bigger. - Unknown",
    "Don’t stop when you’re tired. Stop when you’re done. - Unknown",
    "Wake up with determination. Go to bed with satisfaction. - Unknown",
    "Do something today that your future self will thank you for. - Unknown",
    "Little things make big days. - Unknown",
    "It’s going to be hard, but hard does not mean impossible. - Unknown",
    "Don’t wait for opportunity. Create it. - George Bernard Shaw",
    "Sometimes we’re tested not to show our weaknesses, but to discover our strengths. - Unknown",
    "The key to success is to focus on goals, not obstacles. - Unknown",
    "Dream it. Believe it. Build it. - Unknown",
    "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt",
    "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart. - Roy T. Bennett",
    "We may encounter many defeats but we must not be defeated. - Maya Angelou",
    "The only person you are destined to become is the person you decide to be. - Ralph Waldo Emerson",
    "What you get by achieving your goals is not as important as what you become by achieving your goals. - Zig Ziglar",
    "You are never too old to set another goal or to dream a new dream. - C.S. Lewis",
    "Keep your face always toward the sunshine—and shadows will fall behind you. - Walt Whitman",
    "Opportunities don't happen, you create them. - Chris Grosser",
    "Everything you’ve ever wanted is on the other side of fear. - George Addair",
    "It’s not whether you get knocked down, it’s whether you get up. - Vince Lombardi",
    "Hardships often prepare ordinary people for an extraordinary destiny. - C.S. Lewis",
    "The best revenge is massive success. - Frank Sinatra",
    "$hit can't go down if there isn't any $hit to go down. - Zeeless",
    "Told her if i die ima die....young. - Hush",
    'When life gives you "this page is blocked", make an unblocked site. - ab.yz',
    "Lock every door, bar every window - there is always other ways in - Ben_Da_Builder",
"If you can't walk in a straight line, you're probably gay. - Brock",
"Big words are inconsequential. - Zeeless"
]
function displayRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    document.getElementById('random-quote').innerText = quotes[randomIndex];
}
document.querySelectorAll('.item').forEach((item, index) => {
    item.style.setProperty('--index', index);
});