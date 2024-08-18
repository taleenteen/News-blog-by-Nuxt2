export default async function ({ store, redirect, route }) {
  if (store.getters.isAuth && route.path.includes('register')) {
    return redirect('/')
  }
}
