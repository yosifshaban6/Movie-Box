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
  },
  ar: {
    watchList: "قائمة المشاهدة",
    watching: "قيد المشاهدة...",
    addToWatchList: "أضف إلي قائمة المشاهدة",
    series: "Series",
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
  },
};
