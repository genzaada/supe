import { Request, Response, NextFunction } from 'express';
import { EventService } from '../services/event.service';
import { AuthRequest } from '../types';

export async function getPublicEvents(req: Request, res: Response, next: NextFunction) {
  try {
    const category = req.query.category as string | undefined;
    const events = await EventService.getPublicEvents(category);
    return res.status(200).json({
      success: true,
      data: events,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAllEventsStaff(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const events = await EventService.getAllEventsForStaff();
    return res.status(200).json({
      success: true,
      data: events,
    });
  } catch (error) {
    next(error);
  }
}

export async function getEventBySlug(req: Request, res: Response, next: NextFunction) {
  try {
    const { slug } = req.params;
    const event = await EventService.getEventBySlug(slug);
    return res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error) {
    next(error);
  }
}

export async function createEvent(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const organizerId = req.user?.userId;
    const event = await EventService.createEvent({ ...req.body, organizerId });
    return res.status(201).json({
      success: true,
      message: 'Event created successfully',
      data: event,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateEvent(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const event = await EventService.updateEvent(id, req.body);
    return res.status(200).json({
      success: true,
      message: 'Event updated successfully',
      data: event,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateEventStatus(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ success: false, message: 'Status is required' });
    }

    const event = await EventService.updateEventStatus(id, status);
    return res.status(200).json({
      success: true,
      message: 'Event status updated',
      data: event,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteEvent(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const result = await EventService.deleteEvent(id);
    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
}
