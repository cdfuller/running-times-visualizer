function paceToTime(pace, distance) {
    return pace * distance;
}

function minutesToHMM(minutes) {
    const totalMinutes = Math.floor(minutes);
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    return `${hours < 10 ? ' ' : ''}${hours}:${String(mins).padStart(2, '0')}`;
}

function minutesToMmss(minutes) {
    const totalSeconds = Math.floor(minutes * 60);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${String(secs).padStart(2, '0')}`;
}