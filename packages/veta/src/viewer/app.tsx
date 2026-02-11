import { useState, useEffect } from "react";
import { Layout } from "./components/layout";
import { SkillList } from "./components/skill-list";
import { SkillDetail } from "./components/skill-detail";

function getHashRoute(): { page: "list" | "detail"; slug?: string } {
  const hash = window.location.hash.replace("#", "");
  const match = hash.match(/^\/skills\/(.+)$/);
  if (match) {
    return { page: "detail", slug: match[1] };
  }
  return { page: "list" };
}

export function App() {
  const [route, setRoute] = useState(getHashRoute);

  useEffect(() => {
    function onHashChange() {
      setRoute(getHashRoute());
    }
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return (
    <Layout>
      {route.page === "detail" && route.slug ? (
        <SkillDetail slug={route.slug} />
      ) : (
        <SkillList />
      )}
    </Layout>
  );
}
