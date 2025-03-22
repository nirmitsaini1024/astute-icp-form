export type ApiResponse<T = any> = {
  success: boolean
  message: string
  data?: T
}

export async function handleApiResponse<T>(response: Response): Promise<ApiResponse<T>> {
  if (!response.ok) {
    // Handle HTTP errors
    const errorData = await response.json().catch(() => null)
    return {
      success: false,
      message: errorData?.message || `Error: ${response.status} ${response.statusText}`,
    }
  }

  try {
    const data = await response.json()
    return {
      success: true,
      message: data.message || "Success",
      data: data,
    }
  } catch (error) {
    return {
      success: false,
      message: "Failed to parse response",
    }
  }
}

