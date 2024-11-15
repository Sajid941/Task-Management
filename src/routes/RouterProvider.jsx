import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Tasks from "../pages/Tasks";

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <Root />,
            children: [
                {
                    path: "/",
                    element: <Tasks />,
                },
            ],
        },
    ],
    {
        future: {
            v7_partialHydration: true,
            v7_fetcherPersist:true,
            v7_skipActionErrorRevalidation:true,
            v7_startTransition: true,
            v7_relativeSplatPath:true,
            v7_normalizeFormMethod:true
        },
    }
);

export default router;
