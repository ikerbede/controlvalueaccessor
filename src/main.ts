import './polyfills';
import { bootstrapApplication } from '@angular/platform-browser';
import { CvComponent } from './app/cv/cv.component';

bootstrapApplication(CvComponent)
  .then((ref) => {
    // Ensure Angular destroys itself on hot reloads.
    if (window['ngRef']) {
      window['ngRef'].destroy();
    }
    window['ngRef'] = ref;

    // Otherwise, log the boot error
  })
  .catch((err) => console.error(err));
