/*
  The testimonials section is intentionally removed.

  It rendered v0 template placeholder reviews ("Sarah Johnson", "Wedding Client",
  /placeholder.svg avatars) served from /api/testimonials, alongside a hardcoded
  "5.0 on Google Reviews" claim — invented social proof for a restaurant that has
  not opened. That is a consumer-deception problem, so the content is gone rather
  than hollowed out into an empty carousel.

  This stub renders nothing so that the existing <TestimonialsSection /> usage in
  app/page.tsx keeps compiling. Remove the import and the usage there, then delete
  this file. Bring the section back only when there are real, attributable reviews
  to show.
*/
export function TestimonialsSection() {
  return null
}
