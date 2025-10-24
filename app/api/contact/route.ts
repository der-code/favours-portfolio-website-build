import { NextRequest, NextResponse } from 'next/server'
import { sendEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { name, email, subject, message } = body

        // Validate required fields
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { success: false, error: 'All fields are required' },
                { status: 400 }
            )
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { success: false, error: 'Invalid email format' },
                { status: 400 }
            )
        }

        console.log('[Contact API] Sending email:', { name, email, subject })

        // Send email
        await sendEmail(name, email, subject, message)

        console.log('[Contact API] Email sent successfully')

        return NextResponse.json({
            success: true,
            message: 'Email sent successfully'
        })

    } catch (error) {
        console.error('[Contact API] Error sending email:', error)

        return NextResponse.json(
            {
                success: false,
                error: 'Failed to send email. Please try again later.'
            },
            { status: 500 }
        )
    }
}
