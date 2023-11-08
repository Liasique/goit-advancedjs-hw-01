import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const LS_KEY = 'videoplayer-current-time';

const onTimeUpdate = throttle((data) => {
  localStorage.setItem(LS_KEY, data.seconds);
}, 1000);

player.on('timeupdate', onTimeUpdate);

const savedTime = parseFloat(localStorage.getItem(LS_KEY)) || 0;
player.setCurrentTime(savedTime).catch((error) => {
  console.error('Failed to set video current time: ', error);
});
