import { redirect } from 'next/navigation'

// Keep existing bookmarks working while /enquiry remains the single canonical form.
export default function StartProjectPage() {
  redirect('/enquiry')
}
