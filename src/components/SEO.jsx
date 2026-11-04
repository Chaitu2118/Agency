
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://thetavqo.pages.dev";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

const SEO_CONFIG = {
    "/": {
        title: "TAVQO | Websites, Apps & Digital Product Development",
        description:
            "TAVQO builds custom websites, mobile applications, AI solutions, interactive digital experiences, and connected systems.",
    },
    "/about": {
        title: "About TAVQO | Digital Development & Technology",
        description:
            "Discover TAVQO's approach to digital product development, creative technology, and meaningful digital experiences.",
    },
    "/services": {
        title: "Digital Development Services | TAVQO",
        description:
            "Explore TAVQO's website development, mobile apps, UI/UX, AI integration, automation, and interactive development services.",
    },
    "/contact": {
        title: "Start a Project with TAVQO | Contact",
        description:
            "Contact TAVQO to discuss website development, mobile applications, AI solutions, and custom digital projects.",
    },
    "/privacy-policy": {
        title: "Privacy Policy | TAVQO",
        description:
            "Read TAVQO's privacy policy and understand how contact information is handled.",
    },
    "/terms-and-conditions": {
        title: "Terms & Conditions | TAVQO",
        description:
            "Read the terms and conditions for using the TAVQO website and services.",
    },
    "/disclaimer": {
        title: "Disclaimer | TAVQO",
        description:
            "Read the website and service disclaimer for TAVQO.",
    },
};

function setMeta(attribute, name, content) {
    let element = document.querySelector(
        `meta[${attribute}="${name}"]`
    );

    if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
    }

    element.setAttribute("content", content);
}

function setCanonical(url) {
    let element = document.querySelector(
        'link[rel="canonical"]'
    );

    if (!element) {
        element = document.createElement("link");
        element.rel = "canonical";
        document.head.appendChild(element);
    }

    element.href = url;
}

export default function SEO() {
    const { pathname } = useLocation();

    useEffect(() => {
        const page = SEO_CONFIG[pathname];

        if (!page) {
            document.title = "Page Not Found | TAVQO";
            setMeta("name", "robots", "noindex, nofollow");

            document
                .querySelector('link[rel="canonical"]')
                ?.remove();

            return;
        }

        const canonicalURL = `${SITE_URL}${pathname}`;

        document.title = page.title;

        setMeta("name", "description", page.description);
        setMeta("name", "robots", "index, follow");

        setMeta("property", "og:title", page.title);
        setMeta("property", "og:description", page.description);
        setMeta("property", "og:url", canonicalURL);
        setMeta("property", "og:site_name", "TAVQO");
        setMeta("property", "og:type", "website");
        setMeta("property", "og:image", DEFAULT_IMAGE);

        setMeta("name", "twitter:card", "summary_large_image");
        setMeta("name", "twitter:title", page.title);
        setMeta("name", "twitter:description", page.description);
        setMeta("name", "twitter:image", DEFAULT_IMAGE);

        setCanonical(canonicalURL);
    }, [pathname]);

    return null;
}
