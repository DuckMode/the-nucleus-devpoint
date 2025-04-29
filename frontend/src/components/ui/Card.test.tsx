import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card'

describe('Card component', () => {
  it('renders Card with children', () => {
    render(
      <Card>
        <div>Card Content</div>
      </Card>
    )
    
    expect(screen.getByText('Card Content')).toBeInTheDocument()
  })

  it('applies custom className to Card', () => {
    render(
      <Card className="custom-class">
        <div>Card Content</div>
      </Card>
    )
    
    const card = screen.getByText('Card Content').parentElement
    expect(card).toHaveClass('custom-class')
    expect(card).toHaveClass('bg-white') // Default class
  })

  it('renders CardHeader with children', () => {
    render(
      <Card>
        <CardHeader>
          <div>Header Content</div>
        </CardHeader>
      </Card>
    )
    
    expect(screen.getByText('Header Content')).toBeInTheDocument()
  })

  it('renders CardTitle with children', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
        </CardHeader>
      </Card>
    )
    
    expect(screen.getByText('Card Title')).toBeInTheDocument()
  })

  it('renders CardDescription with children', () => {
    render(
      <Card>
        <CardHeader>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
      </Card>
    )
    
    expect(screen.getByText('Card Description')).toBeInTheDocument()
  })

  it('renders CardContent with children', () => {
    render(
      <Card>
        <CardContent>
          <div>Content Area</div>
        </CardContent>
      </Card>
    )
    
    expect(screen.getByText('Content Area')).toBeInTheDocument()
  })

  it('renders CardFooter with children', () => {
    render(
      <Card>
        <CardFooter>
          <div>Footer Content</div>
        </CardFooter>
      </Card>
    )
    
    expect(screen.getByText('Footer Content')).toBeInTheDocument()
  })

  it('renders a complete card with all subcomponents', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Complete Card</CardTitle>
          <CardDescription>This is a complete card example</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Main content goes here</p>
        </CardContent>
        <CardFooter>
          <p>Footer content</p>
        </CardFooter>
      </Card>
    )
    
    expect(screen.getByText('Complete Card')).toBeInTheDocument()
    expect(screen.getByText('This is a complete card example')).toBeInTheDocument()
    expect(screen.getByText('Main content goes here')).toBeInTheDocument()
    expect(screen.getByText('Footer content')).toBeInTheDocument()
  })
})
