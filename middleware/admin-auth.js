export default async function ({ store, redirect }) {
  if (!store.getters.isAdmin) {
    return redirect('/')
  }
}
