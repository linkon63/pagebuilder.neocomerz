import * as React from 'react';

const WhatsAppIcon = () => (
    <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M42 24C42 33.9411 33.9411 42 24 42C20.2082 42 16.6903 40.8276 13.789 38.8255L7.63636 40.3636L9.24864 34.3176C7.20139 31.396 6 27.8383 6 24C6 14.0589 14.0589 6 24 6C33.9411 6 42 14.0589 42 24Z"
            fill="url(#paint0_linear_3149_857)"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M24 45C35.598 45 45 35.598 45 24C45 12.402 35.598 3 24 3C12.402 3 3 12.402 3 24C3 27.7663 3.9915 31.3011 5.72771 34.3575L3 45L13.9723 42.4557C16.9521 44.0782 20.3684 45 24 45ZM24 41.7692C33.8137 41.7692 41.7692 33.8137 41.7692 24C41.7692 14.1863 33.8137 6.23077 24 6.23077C14.1863 6.23077 6.23077 14.1863 6.23077 24C6.23077 27.7891 7.41675 31.3012 9.43776 34.1853L7.84615 40.1538L13.9199 38.6354C16.784 40.6118 20.2569 41.7692 24 41.7692Z"
            fill="#D7FFDD"
        />
        <path
            d="M18.75 14.2501C18.2507 13.2472 17.4848 13.336 16.711 13.336C15.3281 13.336 13.1719 14.9924 13.1719 18.0752C13.1719 20.6017 14.2852 23.3673 18.0366 27.5044C21.6571 31.4971 26.4141 33.5625 30.3633 33.4922C34.3125 33.4218 35.125 30.0234 35.125 28.8757C35.125 28.367 34.8094 28.1132 34.5919 28.0443C33.2461 27.3984 30.764 26.195 30.1992 25.9688C29.6345 25.7427 29.3396 26.0486 29.1563 26.2149C28.6441 26.703 27.6289 28.1414 27.2813 28.4649C26.9337 28.7885 26.4154 28.6247 26.1998 28.5024C25.4062 28.184 23.2544 27.2269 21.5392 25.5642C19.418 23.5079 19.2935 22.8005 18.8939 22.1707C18.5741 21.6669 18.8087 21.3578 18.9258 21.2227C19.3828 20.6954 20.0139 19.8812 20.2969 19.4766C20.5799 19.072 20.3552 18.4578 20.2204 18.0752C19.6407 16.4298 19.1495 15.0524 18.75 14.2501Z"
            fill="white"
        />
        <defs>
            <linearGradient
                id="paint0_linear_3149_857"
                x1="39.75"
                y1="10.5"
                x2="6"
                y2="42"
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#5BD066" />
                <stop offset="1" stopColor="#27B43E" />
            </linearGradient>
        </defs>
    </svg>
);

export interface HelplineProps {
    whatsappNumber?: string;
}

export default function Helpline({ whatsappNumber = "+880 1712-508063" }: HelplineProps) {
    const formattedNumber = whatsappNumber.replace(/[^0-9+]/g, '');
    return (
        <a
            href={`https://wa.me/${formattedNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`WhatsApp Customer Support: ${whatsappNumber}`}
            className="block w-fit cursor-pointer rounded-2xl border-2 border-green-500 bg-white px-5 py-1.5 transition-colors duration-200 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
            <div className="relative flex items-center gap-1 text-green-500">
                <span className="text-base leading-5 underline">
                    যেকোন প্রয়োজনে
                </span>

                <div className="pointer-events-none absolute left-[126px] top-[-30px] transition-transform duration-200 hover:scale-110">
                    <WhatsAppIcon />
                </div>
            </div>

            <p className="text-2xl font-semibold leading-8 text-green-500">
                {whatsappNumber}
            </p>
        </a>
    );
}
