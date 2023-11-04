import express from 'express'
import { UserRoute } from '../app/modules/user/user.routes'
import { AuthRoute } from '../app/modules/auth/auth.route'
import { UploadRoute } from '../app/modules/cloudinary/upload.route'
import { BookRoute } from '../app/modules/books/book.routes'
import { ReviewRoute } from '../app/modules/review/review.route'
import { WishRoute } from '../app/modules/wish/wish.route'
import { ReadingRoute } from '../app/modules/reading/reading.route'
import { CartRoute } from '../app/modules/addToCart/cart.route'
import { BlogRoute } from '../app/modules/blog/blog.routes'

const router = express.Router()

const all_routes = [
  { path: '/auth', router: AuthRoute },
  { path: '/upload', router: UploadRoute },
  { path: '/', router: UserRoute },
  { path: '/users', router: UserRoute },
  { path: '/books', router: BookRoute },
  { path: '/reviews', router: ReviewRoute },
  { path: '/wish', router: WishRoute },
  { path: '/reading', router: ReadingRoute },
  { path: '/cart', router: CartRoute },
  { path: '/blog', router: BlogRoute },
]

all_routes.map(item => router.use(item.path, item.router))

export default router
