function paceToTime(pace, distance) {
    return pace * distance;
}

function minutesToHMMSS(minutes) {
    const totalSeconds = Math.floor(minutes * 60);
    const hours = Math.floor(totalSeconds / 3600);
    const remainingSeconds = totalSeconds % 3600;
    const mins = Math.floor(remainingSeconds / 60);
    const secs = remainingSeconds % 60;
    return `${hours < 10 ? ' ' : ''}${hours}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function minutesToMmss(minutes) {
    const totalSeconds = Math.floor(minutes * 60);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${String(secs).padStart(2, '0')}`;
}