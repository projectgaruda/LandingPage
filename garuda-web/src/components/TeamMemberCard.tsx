import styles from "./TeamMemberCard.module.css";

export type TeamMember = {
  slug: string;
  name: string | null;
  role: string;
  contribution: string;
  photo: string | null;
};

type Props = {
  member: TeamMember;
  highlight?: boolean;
  variant?: "default" | "captain";
};

function getInitials(name: string | null, fallback: string): string {
  if (!name || name.trim() === "" || name === "—") return fallback;
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function TeamMemberCard({
  member,
  highlight = false,
  variant = "default",
}: Props) {
  const initials = getInitials(member.name, member.slug.slice(0, 2).toUpperCase());
  const isCaptain = variant === "captain";
  const cls = [
    styles.card,
    isCaptain ? styles.captainCard : "",
    highlight ? styles.highlight : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={cls}>
      <div className={styles.photoFrame}>
        {member.photo ? (
          <img
            src={member.photo}
            alt={member.name ?? member.role}
            className={styles.photo}
            loading="lazy"
          />
        ) : (
          <div className={styles.placeholder} aria-hidden="true">
            <span className={styles.initials}>{initials}</span>
            <span className={styles.placeholderHint}>Photo coming soon</span>
          </div>
        )}
      </div>

      <div className={styles.info}>
        <h3 className={styles.name}>
          {member.name && member.name !== "—" ? (
            member.name
          ) : (
            <span className={styles.namePlaceholder}>Member name</span>
          )}
        </h3>
        <span className={styles.role}>{member.role}</span>
        <p className={styles.contribution}>{member.contribution}</p>
      </div>
    </article>
  );
}
