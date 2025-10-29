import { FaqType } from "@/app/types/faq";
import { FeatureType } from "@/app/types/features";
import { FooterType } from "@/app/types/footerlink";
import { HeaderItem } from "@/app/types/menu";
import { SocialType } from "@/app/types/sociallink";
import { WorkType } from "@/app/types/work";

export const Headerdata: HeaderItem[] = [
  { label: "Home", href: "/" },
  { label: "Exchange", href: "/#exchange-section" },
  { label: "Features", href: "/#features-section" },
  { label: "FAQ", href: "/#faq-section" },
  { label: "Contact Us", href: "/#contact" },
  { label: "Docs", href: "/documentation" },
];

const basePath = process.env.NODE_ENV === "production" ? "/crypto-nextjs" : "";

export const Companiesdata: { imgSrc: string }[] = [
  {
    imgSrc: `${basePath}/images/companies/birdseye.svg`,
  },
  {
    imgSrc: `${basePath}/images/companies/break.svg`,
  },
  {
    imgSrc: `${basePath}/images/companies/keddar.svg`,
  },
  {
    imgSrc: `${basePath}/images/companies/shield.svg`,
  },
  {
    imgSrc: `${basePath}/images/companies/tandov.svg`,
  },
  {
    imgSrc: `${basePath}/images/companies/tree.svg`,
  },
];

export const workdata: WorkType[] = [
  {
    imgSrc: `${basePath}/images/work/icon-one.svg`,
    heading: "Create Account",
    subheading:
      "Sign up with your email, set up a secure password, and verify your identity to unlock full access to the platform. Getting started takes just a few minutes.",
  },
  {
    imgSrc: `${basePath}/images/work/icon-two.svg`,
    heading: "Add Funds",
    subheading:
      "Deposit money using your preferred payment method — bank transfer, debit card, or crypto wallet — and get ready to explore the world of digital assets.",
  },
  {
    imgSrc: `${basePath}/images/work/icon-three.svg`,
    heading: "Buy, Sell & Exchange",
    subheading:
      "Easily buy or sell cryptocurrencies like Bitcoin and Ethereum, or convert between coins — all with real-time rates and low transaction fees.",
  },
];

export const Featuresdata: FeatureType[] = [
  {
    imgSrc: `${basePath}/images/features/featureOne.svg`,
    heading: "Secure Storage",
    subheading:
      "Your crypto is protected with advanced encryption and offline cold wallets, ensuring top-tier security and privacy.",
  },
  {
    imgSrc: `${basePath}/images/features/featureTwo.svg`,
    heading: "Free to Use",
    subheading:
      "Enjoy powerful portfolio tracking, live analytics, and account management tools — all without any hidden fees.",
  },
  {
    imgSrc: `${basePath}/images/features/featureThree.svg`,
    heading: "Real-Time Price Data",
    subheading:
      "Get live crypto prices, market updates, and real-time data from top global exchanges — all in one place, 24/7.",
  },
];

export const Faqdata: FaqType[] = [
  {
    heading: "1. What is cryptocurrency?",
    subheading:
      "Cryptocurrency is a digital or virtual currency secured by cryptography, making it nearly impossible to counterfeit or double-spend. It operates on decentralized networks called blockchains, allowing peer-to-peer transactions without intermediaries.",
  },
  {
    heading: "2. Can cryptocurrency be converted to cash?",
    subheading:
      "Yes, cryptocurrencies can be converted to cash through exchanges, peer-to-peer platforms, or crypto ATMs. Many platforms allow you to sell your crypto and withdraw funds directly to your bank account.",
  },
  {
    heading: "3. How long should you hold cryptocurrency?",
    subheading:
      "The holding period depends on your investment goals. Some traders prefer short-term trading to capitalize on price volatility, while others hold long-term, believing in the asset's future value growth. Always assess your risk tolerance before deciding.",
  },
];

export const Sociallinkdata: SocialType[] = [
  {
    imgsrc: `${basePath}/images/footer/insta.svg`,
    href: "https://instagram.com/",
  },
  {
    imgsrc: `${basePath}/images/footer/dribble.svg`,
    href: "https://dribble.com/",
  },
  {
    imgsrc: `${basePath}/images/footer/twitter.svg`,
    href: "https://twitter.com/",
  },
  {
    imgsrc: `${basePath}/images/footer/youtube.svg`,
    href: "https://youtube.com/",
  },
];

export const Footerlinkdata: FooterType[] = [
  { label: "Home", href: "/" },
  { label: "Exchange", href: "/#exchange-section" },
  { label: "Features", href: "/#features-section" },
  { label: "FAQ", href: "/#faq-section" },
  { label: "Contact Us", href: "/#contact" },
];
