export default async function Page({
    params,
  }: {
    params: Promise<{ tipo: string }>
  }) {
    const tipo = (await params).tipo
    return <div>My Post: {tipo}</div>
  }