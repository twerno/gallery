import * as React from 'react';
import { animated, useTransition } from 'react-spring';

export interface ISpringHorizontalTransitionProps<T> {
    item: T;
    transitionDirection?: 'next' | 'prev';
    children: (item: T) => React.ReactNode;
}

export const SpringHorizontalTransition = <T extends { id: string }>(props: ISpringHorizontalTransitionProps<T>) => {
    const transitionDirection = props.transitionDirection;

    const transformFrom = transitionDirection === 'next'
        ? 'translateX(100%)'
        : transitionDirection === 'prev'
            ? 'translateX(-100%)'
            : 'translateX(0)';

    const transformLeave = transitionDirection === 'next'
        ? 'translateX(-100%)'
        : transitionDirection === 'prev'
            ? 'translateX(100%)'
            : 'translateX(0)';

    const transitions = useTransition(props.item, item => item.id,
        {
            from: () => ({
                position: 'absolute',
                opacity: 0,
                width: '100%',
                height: '100%',
                transform: transformFrom
            }),
            enter: () => ({ opacity: 1, transform: 'translateX(0)' }),
            leave: () => ({ transform: transformLeave, opacity: 0 }),
            unique: true,
            reset: true
        }
    );

    return (
        <>
            {
                transitions.map((springProps) =>
                    <animated.div style={springProps.props} key={springProps.key}>
                        {props.children(springProps.item)}
                    </animated.div>
                )
            }
        </>
    );

};
