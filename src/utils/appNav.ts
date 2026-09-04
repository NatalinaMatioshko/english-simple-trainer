export type AppNavId =
  | "home"
  | "roadmap"
  | "lessons"
  | "trainer"
  | "vocab"
  | "homework";

export type AppNavItem = {
  id: AppNavId;
  to: string;
  label: string;
};

export const appNavItems: AppNavItem[] = [
  { id: "roadmap", to: "/", label: "Roadmap" },
  { id: "home", to: "/cabinet", label: "Кабінет" },
  { id: "lessons", to: "/lessons", label: "Уроки" },
  { id: "trainer", to: "/trainer", label: "Тренажер" },
  { id: "vocab", to: "/vocab", label: "Словник" },
  { id: "homework", to: "/homework", label: "Домашнє" },
];

export const mobileNavItems: AppNavItem[] = appNavItems.filter(
  (item) => item.id !== "home",
);

export function isAppNavActive(pathname: string, to: string): boolean {
  if (to === "/") return pathname === "/";
  if (to === "/cabinet") return pathname === "/cabinet";
  if (to === "/lessons") {
    return pathname === "/lessons" || pathname.startsWith("/lesson-");
  }
  if (to === "/homework") {
    return (
      pathname === "/homework" ||
      pathname.startsWith("/homework/") ||
      pathname.startsWith("/hw-")
    );
  }
  if (to === "/trainer") return pathname === "/trainer";
  if (to === "/vocab") return pathname === "/vocab";
  return pathname === to || pathname.startsWith(`${to}/`);
}

export function isLessonWorkspacePath(pathname: string): boolean {
  return (
    /^\/lesson-\d+/.test(pathname) ||
    /^\/hw-\d+/.test(pathname) ||
    /^\/homework\/\d+/.test(pathname)
  );
}

type Crumb = { label: string; to?: string };

export function getPageContext(pathname: string): {
  title: string;
  crumbs: Crumb[];
} {
  if (pathname === "/") {
    return { title: "Roadmap", crumbs: [{ label: "Roadmap" }] };
  }
  if (pathname === "/cabinet") {
    return {
      title: "Кабінет",
      crumbs: [{ label: "Roadmap", to: "/" }, { label: "Кабінет" }],
    };
  }
  if (pathname === "/lessons") {
    return { title: "Уроки", crumbs: [{ label: "Уроки" }] };
  }
  const lessonMatch = pathname.match(/^\/lesson-(\d+)/);
  if (lessonMatch) {
    return {
      title: `Урок ${lessonMatch[1]}`,
      crumbs: [
        { label: "Уроки", to: "/lessons" },
        { label: `Урок ${lessonMatch[1]}` },
      ],
    };
  }
  if (pathname === "/trainer") {
    return { title: "Тренажер", crumbs: [{ label: "Тренажер" }] };
  }
  if (pathname === "/vocab") {
    return { title: "Словник", crumbs: [{ label: "Словник" }] };
  }
  if (pathname === "/homework") {
    return { title: "Домашнє", crumbs: [{ label: "Домашнє" }] };
  }
  const hwMatch = pathname.match(/^\/hw-(\d+)/);
  if (hwMatch) {
    return {
      title: `HW ${hwMatch[1]}`,
      crumbs: [
        { label: "Домашнє", to: "/homework" },
        { label: `HW ${hwMatch[1]}` },
      ],
    };
  }
  const hwIdMatch = pathname.match(/^\/homework\/(\d+)/);
  if (hwIdMatch) {
    return {
      title: `HW ${hwIdMatch[1]}`,
      crumbs: [
        { label: "Домашнє", to: "/homework" },
        { label: `HW ${hwIdMatch[1]}` },
      ],
    };
  }
  if (pathname === "/login") {
    return { title: "Вхід", crumbs: [{ label: "Вхід" }] };
  }
  if (pathname === "/about-me") {
    return {
      title: "About me",
      crumbs: [{ label: "Уроки", to: "/lessons" }, { label: "About me" }],
    };
  }
  if (pathname === "/self-study") {
    return {
      title: "Практика",
      crumbs: [{ label: "Уроки", to: "/lessons" }, { label: "Практика" }],
    };
  }
  if (pathname === "/extra-resources") {
    return {
      title: "Матеріали",
      crumbs: [
        { label: "Уроки", to: "/lessons" },
        { label: "Extra resources" },
      ],
    };
  }
  if (pathname === "/admin/submissions") {
    return { title: "Роботи учнів", crumbs: [{ label: "Роботи учнів" }] };
  }
  if (pathname === "/a1-level-test") {
    return {
      title: "A1 test",
      crumbs: [{ label: "Уроки", to: "/lessons" }, { label: "A1 test" }],
    };
  }
  return { title: "English Simple Trainer", crumbs: [{ label: "Сторінка" }] };
}
