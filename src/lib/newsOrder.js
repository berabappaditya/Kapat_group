/**
 * Ordering for group news, shared by the Home feed and the Group News page.
 *
 * News is authored one document per semester, labelled "Spring Semester 2026",
 * "Monsoon Semester 2025" and so on. The academic year runs Spring (Jan–May)
 * then Monsoon (Aug–Dec), so within a calendar year Spring comes first and
 * Spring 2026 is newer than Monsoon 2025. Order is derived from the label
 * rather than the CMS `order` field so a semester added in the Studio lands in
 * the right place whatever number the editor gives it.
 */

const SEASONS = [
  { label: "Spring", rank: 0, match: /spring/i },
  { label: "Summer", rank: 1, match: /summer/i },
  { label: "Monsoon", rank: 2, match: /monsoon|autumn|fall/i },
  { label: "Winter", rank: 3, match: /winter/i },
];

/** "Monsoon Semester 2025" → { year: 2025, season: "Monsoon", sortKey: 2025.2 } */
export function parseSemester(category) {
  const text = String(category || "");
  const year = text.match(/\b(?:19|20)\d{2}\b/);
  if (!year) return null;
  const season = SEASONS.find((entry) => entry.match.test(text));
  return {
    year: Number(year[0]),
    season: season ? season.label : null,
    sortKey: Number(year[0]) + (season ? season.rank : 0) / 10,
  };
}

/**
 * Newest semester first. Groups whose label carries no year (legacy documents
 * such as "Recent Updates") keep their relative order and sit at the end.
 */
export function sortNewsGroups(groups) {
  return (groups || [])
    .map((group, index) => ({
      ...group,
      semester: parseSemester(group.category),
      index,
    }))
    .sort((a, b) => {
      if (a.semester && b.semester) return b.semester.sortKey - a.semester.sortKey;
      if (a.semester) return -1;
      if (b.semester) return 1;
      return a.index - b.index;
    })
    .map(({ index, ...group }) => group);
}

/** Every item as a flat newest-first list, each tagged with its semester. */
export function flattenNews(groups) {
  return sortNewsGroups(groups).flatMap((group) =>
    (group.items || []).map((text) => ({
      text,
      category: group.category,
      semester: group.semester,
    }))
  );
}

/** Semesters bucketed under their calendar year, newest year first. */
export function groupByYear(groups) {
  const years = [];
  const byYear = new Map();
  sortNewsGroups(groups).forEach((group) => {
    const year = group.semester ? group.semester.year : null;
    if (!byYear.has(year)) {
      const bucket = { year, groups: [] };
      byYear.set(year, bucket);
      years.push(bucket);
    }
    byYear.get(year).groups.push(group);
  });
  return years;
}

export function countItems(groups) {
  return (groups || []).reduce(
    (total, group) => total + ((group.items && group.items.length) || 0),
    0
  );
}
