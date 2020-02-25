import { cleanup } from '@testing-library/react';
import App from 'main/App';
import { Path } from 'main/routes/Path';
import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';

afterEach(cleanup);

test('Renders home path',
    async () => {
        const div = document.createElement('div');
        ReactDOM.render(
            (
                <MemoryRouter initialEntries={[Path.homeUrl()]}>
                    <App />
                </MemoryRouter>
            ), div);
    }
);

test('Renders gallery path',
    async () => {
        const div = document.createElement('div');
        ReactDOM.render(
            (
                <MemoryRouter initialEntries={[Path.galleryUrl({ q: '' })]}>
                    <App />
                </MemoryRouter>
            ), div);
    }
);
