import Container from "@/components/container";

export default function MainFeatures() {
  return (
    <Container className="py-28">
      {MAIN_FEATURES_LIST.map((feature) => (
        <section
          key={feature.title}
          className="mb-16 flex items-end gap-8 py-20"
        >
          <div className="flex-1 pb-12">
            <div className="max-w-[500px]">
              <h2 className="mb-5 text-3xl font-semibold">{feature.title}</h2>
              <p>{feature.description}</p>
            </div>
          </div>
          <picture className="border-primary block min-h-[500px] flex-1 rounded-3xl border-2 p-8">
            Illustration or image here
          </picture>
        </section>
      ))}
    </Container>
  );
}

const MAIN_FEATURES_LIST = [
  {
    title: "Create a skill once, available for all agents",
    description:
      "Create a skill once and make it available for all your agents. No need to recreate the same skill for each agent, saving you time and effort.",
  },
  {
    title: "Post reeckon in GitHub, Azure, etc.",
    description:
      "Post your reeckon in popular platforms like GitHub and Azure, making it easily accessible to your team and collaborators.",
  },
  {
    title: "Install them wherever you need it",
    description:
      "Install your skills wherever you need them, whether it's in your development environment, project management tools, or other platforms, ensuring seamless integration into your workflow.",
  },
  {
    title: "Tag system",
    description:
      "Organize your skills with a tag system, allowing you to categorize and easily find the skills you need when you need them.",
  },
  {
    title: "Beautiful UI to visualize your skills",
    description:
      "Visualize your skills with a beautiful and intuitive user interface, making it easy to manage and navigate through your skill library.",
  },
];
