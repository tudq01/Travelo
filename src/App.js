import React, { useEffect,Suspense } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import "./scss/style.scss";
import { Footer, Header } from "./container";
import { HomeRoutes, AreaRoutes, HouseRoutes, ChatRoutes } from "./routes";

import DefaultLayout from "./layout/DefaultLayout";
const Home = React.lazy(() => import("./view/home/Home"));
const Area = React.lazy(() => import("./view/area/Area"));
const AreaDetails = React.lazy(() => import("./view/area/AreaDetails"));
const House = React.lazy(() => import("./view/house/House"));
const Chat = React.lazy(() => import("./view/chat/Chat"));
const Loading = React.lazy(() => import("./view/chat/Loading"));

const renderRoute = (route, index) => {
  let Layout = DefaultLayout;
  if (route.layout) {
    Layout = route.layout;
  }
  const Page = route.component;

  if (route.children) {
    return (
      <Route key={index} path={route.path} element={<Outlet />}>
        <Route
          key={0}
          index
          element={
            <Layout>
              <Page />
            </Layout>
          }
        />
        {route.children.map((childRoute, childIndex) => {
          const ChildPage = childRoute.component;

          return renderRoute(childRoute, childIndex);
        })}
      </Route>
    );
  } else {
    return (
      <Route
        key={index}
        path={route.path}
        element={
          <Layout>
            <Page />
          </Layout>
        }
      />
    );
  }
};

const publicRoutes = [
  {
    path: "/",
    component: Home,
    // layout: HomeLayout,

    index: true,
    children: [
      {
        path: "area",
        component: Area,

        index: true,
        children: [
          {
            path: ":areaId",
            component: AreaDetails,
            index: true,
            children: [
              {
                path: ":houseId",
                component: House,
              },
            ],
          },
        ],
      },
      {
        path: "loading",
        component: Loading,
        index: true,
        children: [
          {
            path: ":roomId/:userId:",
            component: Chat,
          },
        ],
      },
    ],
  },
];

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<div>Loading ...</div>}>
        <HomeRoutes />
        <AreaRoutes />
        <HouseRoutes />
        <ChatRoutes />
      </Suspense>
    </BrowserRouter>
    /*
    <BrowserRouter>
      <div className="page">
        <Routes>
          {publicRoutes.map((route, index) => {
            return renderRoute(route, index);
          })}
        </Routes>
      </div>
    </BrowserRouter>
    */
  );
}

export default App;
