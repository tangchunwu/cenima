import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';

interface DynamicSEOProps {
       title?: string;
       description?: string;
       image?: string;
}

export const DynamicSEO = ({ title, description, image }: DynamicSEOProps) => {
       const { t } = useLanguage();

       const siteTitle = "2026 牛马人生重开模拟器 (Shabi Remake)";
       const defaultDesc = "如果2026年可以重来，你会成为卷王之王还是摆烂之神？立即重开，生成你的年度赛博人设。";
       const defaultImage = "https://shabi.fun/og-image.png"; // 替换为真实域名

       const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
       const finalDesc = description || defaultDesc;
       const finalImage = image || defaultImage;

       return (
              <Helmet>
                     <title>{fullTitle}</title>
                     <meta name="description" content={finalDesc} />

                     {/* Open Graph / Facebook */}
                     <meta property="og:type" content="website" />
                     <meta property="og:title" content={fullTitle} />
                     <meta property="og:description" content={finalDesc} />
                     <meta property="og:image" content={finalImage} />

                     {/* Twitter */}
                     <meta property="twitter:card" content="summary_large_image" />
                     <meta property="twitter:title" content={fullTitle} />
                     <meta property="twitter:description" content={finalDesc} />
                     <meta property="twitter:image" content={finalImage} />

                     {/* Theme Color for mobile address bar (沉浸式) */}
                     <meta name="theme-color" content="#020617" />
              </Helmet>
       );
};
