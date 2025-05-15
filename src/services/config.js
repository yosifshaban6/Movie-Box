import axios from "axios";
export const axiosMovies = axios.create({
  baseURL: import.meta.env.VITE_APP_API_MOVIES_URL,
});
export const axiosSeries = axios.create({
  baseURL: import.meta.env.VITE_APP_API_SERIES_URL,
});
export const apiKey = import.meta.env.VITE_APP_API_KEY;
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_MOVIES_URL,
});

export const appItems = {
  en: {
    watchList: "Watch List",
    watching: "Watching...",
    addToWatchList: "Add to Watch List",
    movies: "Movies",
    series: "Series",
    favorites: "Favorites",
    search: "Search",
    welcome: "Welcome to Our Movie Box",
    description:
      "Browse and search through a variety of movies from the latest releases to the classic hits!",
    searchDescription:
      "Find your favorite movies and series quickly and easily.",
    rating: "Rating",
    projectTitle: "Movies Box",
    realLanguage: "Language",
    duration: "Duration",
    searching: "You're searching about",
    noResults: "No results found.",
    backToHomePage: "Back to Home Page",
  },
  ar: {
    watchList: "قائمة المشاهدة",
    watching: "قيد المشاهدة...",
    addToWatchList: "أضف إلي قائمة المشاهدة",
    movies: "أفلام",
    series: "مسلسلات",
    favorites: "المفضلة",
    search: "بحث",
    welcome: "مرحبًا بكم في صندوق الأفلام الخاص بنا",
    description:
      "تصفح وابحث في مجموعة متنوعة من الأفلام من أحدث الإصدارات إلى الكلاسيكيات!",
    searchDescription: "ابحث عن أفلامك ومسلسلاتك المفضلة بسرعة وسهولة.",
    rating: "التقييم",
    projectTitle: "صندوق الأفلام",
    realLanguage: "اللغة",
    duration: "المدة",
    searching: "أنت تبحث عن",
    noResults: "لم يتم العثور على نتائج.",
    backToHomePage: "العودة إلى الصفحة الرئيسية",
  },
  zh: {
    watchList: "观看列表",
    watching: "正在观看...",
    addToWatchList: "添加到观看列表",
    movies: "电影",
    series: "系列",
    favorites: "收藏夹",
    search: "搜索",
    welcome: "欢迎来到我们的电影盒",
    description: "浏览和搜索各种电影，从最新上映到经典佳作！",
    searchDescription: "快速轻松地找到您喜欢的电影和系列。",
    rating: "评分",
    projectTitle: "电影盒",
    realLanguage: "语言",
    duration: "时长",
    searching: "您正在搜索",
    noResults: "未找到结果。",
    backToHomePage: "返回主页",
  },
  fr: {
    watchList: "Liste de visionnage",
    watching: "En train de regarder...",
    addToWatchList: "Ajouter à la liste de visionnage",
    movies: "Films",
    series: "Séries",
    favorites: "Favoris",
    search: "Rechercher",
    welcome: "Bienvenue dans notre boîte à films",
    description:
      "Parcourez et recherchez une variété de films, des dernières sorties aux classiques intemporels !",
    searchDescription:
      "Trouvez vos films et séries préférés rapidement et facilement.",
    rating: "Évaluation",
    projectTitle: "Boîte à films",
    realLanguage: "Langue",
    duration: "Durée",
    searching: "Vous recherchez",
    noResults: "Aucun résultat trouvé.",
    backToHomePage: "Retour à la page d'accueil",
  },
};
