import { Loader2, MoreVertical } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import GlobalApi from '../../service/GlobalApi'

function ResumeCardItem({ resume, refreshData }) {
  const navigation = useNavigate()
  const [openAlert, setOpenAlert] = useState(false)
  const [loading, setLoading] = useState(false)

  const onDelete = () => {
    console.log('DELETE RESUME:', resume)

    if (!resume?.id) {
      return
    }

    setLoading(true)

    GlobalApi.DeleteResumeById(resume.id)
      .then((resp) => {
        console.log('DELETE RESPONSE:', resp)
        refreshData()
        setOpenAlert(false)
        setLoading(false)
      })
      .catch((error) => {
        console.log('DELETE ERROR:', error)
        toast('Failed to delete resume')
        setLoading(false)
      })
  }

  return (
    <div>
      <Link to={`/dashboard/resume/${resume?.id}/edit`}>
        <div
          className='p-14 bg-linear-to-b from-pink-100 via-purple-200 to-blue-200 h-[280px] rounded-t-lg border-t-4'
          style={{
            borderColor: resume?.themeColor || '#a855f7',
          }}
        >
          <div className='flex items-center justify-center h-[180px]'>
            <img src='/cv.png' width={80} height={80} alt='resume' />
          </div>
        </div>
      </Link>

      <div
        className='border p-3 flex justify-between text-white rounded-b-lg shadow-lg'
        style={{
          background: resume?.themeColor || '#a855f7',
        }}
      >
        <h2 className='text-sm'>{resume?.title || 'Untitled Resume'}</h2>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button type='button'>
              <MoreVertical className='h-4 w-4 cursor-pointer' />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() =>
                navigation(`/dashboard/resume/${resume?.id}/edit`)
              }
            >
              Edit
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() =>
                navigation(`/my-resume/${resume?.id}/view`)
              }
            >
              View
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() =>
                navigation(`/my-resume/${resume?.id}/view`)
              }
            >
              Download
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => setOpenAlert(true)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                resume and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete} disabled={loading}>
                {loading ? <Loader2 className='h-4 w-4 animate-spin' /> : 'Delete'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}

export default ResumeCardItem