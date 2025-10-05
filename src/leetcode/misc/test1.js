function cinemaEntries(start, duration, volume) {
  if (!start?.length || !duration?.length || !volume?.length) {
    return 0;
  }

  const shows = start.map((s, i) => ({
    start: s,
    end: s + duration[i],
    volume: volume[i],
  }));

  shows.sort((a, b) => a.end - b.end);

  if (shows.length === 1) {
    return shows[0].volume;
  }

  function findLastNonOverlapping(currentShow, endIndex) {
    let left = 0;
    let right = endIndex;
    let result = -1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (shows[mid].end < currentShow.start) {
        result = mid;
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return result;
  }

  const dp = new Array(shows.length).fill(0);
  dp[0] = shows[0].volume;

  for (let i = 1; i < shows.length; i++) {
    const currentShow = shows[i];
    const lastNonOverlappingIndex = findLastNonOverlapping(currentShow, i - 1);

    const includeVolume =
      currentShow.volume +
      (lastNonOverlappingIndex !== -1 ? dp[lastNonOverlappingIndex] : 0);

    dp[i] = Math.max(dp[i - 1], includeVolume);
  }

  return dp[shows.length - 1];
}
