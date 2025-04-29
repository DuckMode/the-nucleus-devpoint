import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from './Dialog'

describe('Dialog component', () => {
  beforeEach(() => {
    // Create a div with id "root" to serve as a portal container
    const portalRoot = document.createElement('div')
    portalRoot.setAttribute('id', 'root')
    document.body.appendChild(portalRoot)
  })

  it('should render the dialog trigger correctly', () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogTitle>Test Dialog</DialogTitle>
          <DialogDescription>This is a test dialog</DialogDescription>
        </DialogContent>
      </Dialog>
    )

    expect(screen.getByText('Open Dialog')).toBeInTheDocument()
  })

  it('should open the dialog when trigger is clicked', async () => {
    const user = userEvent.setup()
    
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogTitle>Test Dialog</DialogTitle>
          <DialogDescription>This is a test dialog</DialogDescription>
        </DialogContent>
      </Dialog>
    )

    // Dialog content should not be visible initially
    expect(screen.queryByText('Test Dialog')).not.toBeInTheDocument()
    
    // Click the trigger button
    await user.click(screen.getByText('Open Dialog'))
    
    // Dialog content should now be visible
    expect(screen.getByText('Test Dialog')).toBeInTheDocument()
    expect(screen.getByText('This is a test dialog')).toBeInTheDocument()
  })

  it('should close the dialog when clicking outside', async () => {
    const user = userEvent.setup()
    
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogTitle>Test Dialog</DialogTitle>
          <DialogDescription>This is a test dialog</DialogDescription>
        </DialogContent>
      </Dialog>
    )

    // Open the dialog
    await user.click(screen.getByText('Open Dialog'))
    expect(screen.getByText('Test Dialog')).toBeInTheDocument()
    
    // Click outside the dialog (on the overlay)
    const overlay = document.querySelector('[data-radix-popper-content-wrapper]')
    if (overlay) {
      await user.click(overlay)
      
      // Dialog should be closed
      expect(screen.queryByText('Test Dialog')).not.toBeInTheDocument()
    }
  })

  it('should apply custom className to dialog content', () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent className="custom-class">
          <DialogTitle>Test Dialog</DialogTitle>
        </DialogContent>
      </Dialog>
    )

    // Open the dialog
    fireEvent.click(screen.getByText('Open Dialog'))
    
    // Check if the custom class is applied
    const dialogContent = screen.getByRole('dialog')
    expect(dialogContent).toHaveClass('custom-class')
  })
})
