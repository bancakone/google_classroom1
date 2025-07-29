const StatsOverview = ({
  classes,
  groups,
  students,
  submissions,
  messages,
}) => {
  return (
    <section className="stats-overview">
      {[
        { value: classes.length, label: "Classes", className: "" },
        { value: groups.length, label: "Groupes", className: "" },
        { value: students.length, label: "Étudiants", className: "" },
        {
          value: submissions.filter((s) => s.statut === "À corriger").length,
          label: "À corriger",
          className: "warning",
        },
        {
          value: messages.filter((m) => !m.lu).length,
          label: "Messages non lus",
          className: "",
        },
      ].map((stat, index) => (
        <div key={index} className={`stat-card ${stat.className}`}>
          <div className="stat-value">{stat.value}</div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </section>
  );
};

export default StatsOverview;
