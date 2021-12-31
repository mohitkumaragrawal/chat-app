import {
  trigger,
  transition,
  query,
  style,
  group,
  animate,
} from '@angular/animations';

export const routeAnimation = trigger('triggerName', [
  transition('* <=> *', [
    query(':enter, :leave', style({ position: 'fixed', width: '100%' }), {
      optional: true,
    }),
    group([
      query(
        ':leave',
        [
          style({ transform: 'translateY(0%)' }),
          animate(
            '0.5s ease-in-out',
            style({ transform: 'translateX(+100%)', opacity: 0 })
          ),
        ],
        { optional: true }
      ),
      query(
        ':enter',
        [
          style({
            transform: 'scale(0.3)',
            opacity: 0,
          }),
          animate(
            '0.5s ease-in-out',
            style({ transform: 'scale(1)', opacity: 1 })
          ),
        ],
        { optional: true }
      ),
    ]),
  ]),
]);
